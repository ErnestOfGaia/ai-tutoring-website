/**
 * Ingestion pipeline — pure Node.js ESM, uses curl for HTTPS to avoid a
 * Node 24/Windows TLS segfault. Everything is synchronous; no event loop needed.
 *
 * Pulls the latest agentic-brain from GitHub, chunks every markdown file,
 * embeds with Voyage AI (voyage-3-lite), and saves to brain.json.
 * Resumable: already-embedded chunks are skipped on re-run.
 *
 * The git sync is resilient: if pull/clone fails but a usable cached copy
 * exists, it logs a warning and ingests from the cache; a cache dir that is
 * not a valid git repo (interrupted clone) is wiped and re-cloned. The script
 * only hard-fails when there is no usable source at all.
 *
 * Writes data/.brain-ingest-incomplete at start and removes it on success —
 * entrypoint.sh uses the leftover sentinel to resume an interrupted ingest
 * at next boot.
 *
 * Usage:
 *   npm run ingest
 *
 * Requires VOYAGE_API_KEY in .env (local) or the container environment.
 */

import { execSync, execFileSync }                               from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync,
         rmSync, statSync, writeFileSync }                       from 'node:fs';
import path                                                      from 'node:path';
import { fileURLToPath }                                         from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────
// BRAIN_REPO_URL override: lets ops point at a fork or an authenticated URL
// (and lets tests point at a bogus remote) without rebuilding the image.
const REPO_URL    = process.env.BRAIN_REPO_URL || 'https://github.com/ErnestOfGaia/agentic-brain';
const CACHE_DIR   = path.resolve('data/agentic-brain-cache');
const DB_PATH     = path.resolve('data/brain.json');
const SENTINEL    = path.resolve('data/.brain-ingest-incomplete');
const MODEL       = 'voyage-3-lite';
const BATCH       = 10;      // chunks per Voyage request (free-tier safe)
const MIN_CHARS   = 50;
const MAX_CHARS   = 1500;
const RPM_DELAY   = 22_000;  // ms — stays safely under 3 RPM free-tier limit
const MAX_RETRIES = 5;

// ── Sync sleep via Atomics ────────────────────────────────────────────────────
function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

// ── Markdown chunker (no native deps) ────────────────────────────────────────
function chunkMarkdown(content) {
  const sections = content.split(/(?=^#{1,6} )/m).filter(s => s.trim().length >= MIN_CHARS);
  const chunks = [];

  const splitSection = (text) => {
    if (text.length <= MAX_CHARS) {
      if (text.trim().length >= MIN_CHARS) chunks.push(text.trim());
      return;
    }
    const paragraphs = text.split(/\n\n+/);
    let current = '';
    for (const para of paragraphs) {
      const candidate = current ? `${current}\n\n${para}` : para;
      if (candidate.length > MAX_CHARS && current) {
        if (current.trim().length >= MIN_CHARS) chunks.push(current.trim());
        current = para;
      } else {
        current = candidate;
      }
    }
    if (current.trim().length >= MIN_CHARS) chunks.push(current.trim());
  };

  if (sections.length > 0) {
    sections.forEach(splitSection);
  } else {
    splitSection(content);
  }
  return chunks;
}

// ── JSON store helpers ────────────────────────────────────────────────────────
function loadStore() {
  if (!existsSync(DB_PATH)) return new Map();
  try {
    const records = JSON.parse(readFileSync(DB_PATH, 'utf-8'));
    return new Map(records.map(r => [r.id, r]));
  } catch { return new Map(); }
}

function saveStore(store) {
  writeFileSync(DB_PATH, JSON.stringify([...store.values()], null, 0));
}

// ── File helpers ──────────────────────────────────────────────────────────────
function detectRole(filePath) {
  const parts = filePath.toLowerCase().split(/[/\\]/);
  if (parts.includes('marketing')) return 'marketing';
  if (parts.includes('recruiter')) return 'recruiter';
  if (parts.includes('secretary')) return 'secretary';
  if (parts.includes('router'))    return 'router';
  return 'all';
}

function walkMarkdown(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walkMarkdown(full));
    else if (entry.endsWith('.md')) files.push(full);
  }
  return files;
}

// ── Voyage AI via curl (avoids Node HTTPS TLS issues on Windows/Node 24) ─────
const voyageKey = process.env.VOYAGE_API_KEY;
if (!voyageKey) {
  console.error('VOYAGE_API_KEY not set — check .env (local) or the environment: block in docker-compose.yml');
  process.exit(1);
}

function callVoyage(texts, attempt = 1) {
  const body = JSON.stringify({ input: texts, model: MODEL });

  let raw;
  try {
    raw = execFileSync('curl', [
      '-s',
      '-w', '\n__HTTP_STATUS__%{http_code}',
      '-X', 'POST',
      'https://api.voyageai.com/v1/embeddings',
      '-H', 'Content-Type: application/json',
      '-H', `Authorization: Bearer ${voyageKey}`,
      '--data', '@-',        // read body from stdin
    ], { input: body }).toString();
  } catch (e) {
    throw new Error(`curl error: ${e.message}`);
  }

  const statusMatch = raw.match(/\n__HTTP_STATUS__(\d+)$/);
  const status      = statusMatch ? parseInt(statusMatch[1]) : 0;
  const json_str    = raw.replace(/\n__HTTP_STATUS__\d+$/, '').trim();

  if (status === 429) {
    if (attempt > MAX_RETRIES) throw new Error('Rate limit: max retries exceeded.');
    const wait = RPM_DELAY * attempt;
    console.log(`  429 rate limited — waiting ${Math.round(wait / 1000)}s (retry ${attempt}/${MAX_RETRIES})...`);
    sleep(wait);
    return callVoyage(texts, attempt + 1);
  }

  if (status < 200 || status >= 300) {
    throw new Error(`Voyage API ${status}: ${json_str}`);
  }

  const json = JSON.parse(json_str);
  return json.data.map(d => d.embedding);
}

// ── Resilient repo sync ──────────────────────────────────────────────────────
function isGitRepo(dir) {
  try {
    execFileSync('git', ['-C', dir, 'rev-parse', '--is-inside-work-tree'], { stdio: 'pipe' });
    return true;
  } catch { return false; }
}

function hasMarkdown(dir) {
  try { return walkMarkdown(dir).length > 0; } catch { return false; }
}

// A network/GitHub failure must not kill the ingest when a cached copy can
// serve as the source. Only throws when no usable source exists at all.
function syncBrainRepo() {
  console.log('Syncing agentic-brain from GitHub...');

  // Cache dir exists but is not a git repo (clone killed mid-transfer) —
  // wipe it so the clone below starts clean.
  if (existsSync(CACHE_DIR) && !isGitRepo(CACHE_DIR)) {
    console.warn('  WARNING: cache dir is not a valid git repo (interrupted clone?) — removing and re-cloning.');
    rmSync(CACHE_DIR, { recursive: true, force: true });
  }

  if (existsSync(CACHE_DIR)) {
    try {
      execSync('git pull', { cwd: CACHE_DIR, stdio: 'inherit' });
      return;
    } catch (err) {
      if (hasMarkdown(CACHE_DIR)) {
        console.warn(`  WARNING: git pull failed (${err.message.trim()})`);
        console.warn('  Continuing with the cached copy — content may be stale.');
        return;
      }
      console.warn('  WARNING: git pull failed and the cache holds no markdown — removing and re-cloning.');
      rmSync(CACHE_DIR, { recursive: true, force: true });
    }
  }

  try {
    execSync(`git clone "${REPO_URL}" "${CACHE_DIR}"`, { stdio: 'inherit' });
  } catch (err) {
    throw new Error(`git clone failed and no usable cached copy exists — nothing to ingest. (${err.message.trim()})`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
// Sentinel marks an in-flight/interrupted ingest; removed on success below.
mkdirSync(path.dirname(SENTINEL), { recursive: true });
writeFileSync(SENTINEL, 'Ingest in progress or interrupted. entrypoint.sh resumes when this file is present at boot. Safe to delete.\n');

// 1. Sync repo
syncBrainRepo();

// 2. Chunk all markdown files
const mdFiles = walkMarkdown(CACHE_DIR);
console.log(`Found ${mdFiles.length} markdown files`);

const chunks = [];
for (const filePath of mdFiles) {
  const raw     = readFileSync(filePath, 'utf-8');
  const relPath = path.relative(CACHE_DIR, filePath).replace(/\\/g, '/');
  const role    = detectRole(filePath);
  const parts   = chunkMarkdown(raw);
  for (let i = 0; i < parts.length; i++) {
    chunks.push({ id: `${relPath}:${i}`, content: parts[i], source: relPath, agentRole: role });
  }
}
console.log(`Created ${chunks.length} chunks`);

// 3. Resume from existing store
const store   = loadStore();
const pending = chunks.filter(c => !store.has(c.id));
const skipped = chunks.length - pending.length;
if (skipped > 0) console.log(`  Resuming — skipping ${skipped} already-embedded chunks`);

if (pending.length === 0) {
  console.log('All chunks already embedded — done.');
  rmSync(SENTINEL, { force: true });
  process.exit(0);
}

const totalBatches = Math.ceil(pending.length / BATCH);
const etaSecs      = Math.round((totalBatches * RPM_DELAY) / 1000);
console.log(`Embedding ${totalBatches} batches (~${etaSecs}s at free-tier rate)...`);

let done = 0;
for (let i = 0; i < pending.length; i += BATCH) {
  const batchNum = Math.floor(i / BATCH) + 1;
  const batch    = pending.slice(i, i + BATCH);

  try {
    const vecs = callVoyage(batch.map(c => c.content));
    for (let j = 0; j < batch.length; j++) {
      store.set(batch[j].id, { ...batch[j], embedding: vecs[j] });
    }
    done += batch.length;
    saveStore(store);   // persist after each batch — crash-safe
    console.log(`  [${batchNum}/${totalBatches}] ${done}/${pending.length} embedded`);
  } catch (err) {
    console.error(`  Batch ${batchNum} failed:`, err.message);
    console.error('  Partial progress saved. Re-run npm run ingest to resume.');
    process.exit(1);
  }

  if (i + BATCH < pending.length) sleep(RPM_DELAY);
}

console.log(`Done — ${store.size} total chunks saved to brain.json`);
rmSync(SENTINEL, { force: true });
process.exit(0);  // explicit exit skips Node cleanup segfault on Windows/Node 24
