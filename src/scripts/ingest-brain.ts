/**
 * Ingestion pipeline — pulls the latest agentic-brain from GitHub, chunks every
 * markdown file, embeds with Voyage AI (voyage-3-lite), and upserts into brain.db.
 *
 * Usage:
 *   npm run ingest
 *
 * Requires VOYAGE_API_KEY in .env.
 */

import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { VoyageAIClient } from 'voyageai';
import { MDocument } from '@mastra/rag';

// ── Config ────────────────────────────────────────────────────────────────────
const REPO_URL  = 'https://github.com/ErnestOfGaia/agentic-brain';
const CACHE_DIR = path.resolve('agentic-brain-cache');
const DB_PATH   = path.resolve('brain.db');
const MODEL     = 'voyage-3-lite';
const BATCH     = 50;   // max inputs per Voyage API call
const MIN_CHARS = 50;   // skip tiny fragments

// ── DB setup ──────────────────────────────────────────────────────────────────
const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS brain_chunks (
    id           TEXT PRIMARY KEY,
    content      TEXT NOT NULL,
    source       TEXT NOT NULL,
    agent_role   TEXT NOT NULL DEFAULT 'all',
    embedding    TEXT NOT NULL,
    ingested_at  INTEGER DEFAULT (unixepoch())
  )
`);

// ── Voyage AI client ──────────────────────────────────────────────────────────
const voyageKey = process.env.VOYAGE_API_KEY;
if (!voyageKey) throw new Error('VOYAGE_API_KEY is not set in environment.');
const voyage = new VoyageAIClient({ apiKey: voyageKey });

// ── Helpers ───────────────────────────────────────────────────────────────────
function detectRole(filePath: string): string {
  const parts = filePath.toLowerCase().split(/[/\\]/);
  if (parts.includes('marketing')) return 'marketing';
  if (parts.includes('recruiter')) return 'recruiter';
  if (parts.includes('secretary')) return 'secretary';
  if (parts.includes('router'))    return 'router';
  return 'all';
}

function walkMarkdown(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkMarkdown(full));
    } else if (entry.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await voyage.embed({ input: texts, model: MODEL });
  return (res.data ?? []).map(d => d.embedding ?? []);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Clone or update the repo
  console.log('Syncing agentic-brain from GitHub...');
  if (existsSync(CACHE_DIR)) {
    execSync('git pull', { cwd: CACHE_DIR, stdio: 'inherit' });
  } else {
    execSync(`git clone "${REPO_URL}" "${CACHE_DIR}"`, { stdio: 'inherit' });
  }

  // 2. Collect markdown files
  const mdFiles = walkMarkdown(CACHE_DIR);
  console.log(`Found ${mdFiles.length} markdown files`);

  // 3. Chunk every file
  const chunks: Array<{
    id: string;
    content: string;
    source: string;
    agentRole: string;
  }> = [];

  for (const filePath of mdFiles) {
    const raw     = readFileSync(filePath, 'utf-8');
    const relPath = path.relative(CACHE_DIR, filePath).replace(/\\/g, '/');
    const role    = detectRole(filePath);

    const doc = MDocument.fromMarkdown(raw, { source: relPath });
    const parts = await doc.chunk({ strategy: 'markdown', maxSize: 1500, overlap: 150 });

    for (let i = 0; i < parts.length; i++) {
      const text = parts[i].text.trim();
      if (text.length < MIN_CHARS) continue;
      chunks.push({ id: `${relPath}:${i}`, content: text, source: relPath, agentRole: role });
    }
  }
  console.log(`Created ${chunks.length} chunks`);

  // 4. Embed in batches and upsert
  const insert = db.prepare(
    `INSERT OR REPLACE INTO brain_chunks (id, content, source, agent_role, embedding)
     VALUES (?, ?, ?, ?, ?)`
  );

  let done = 0;
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    const vecs  = await embedBatch(batch.map(c => c.content));

    for (let j = 0; j < batch.length; j++) {
      const c = batch[j];
      insert.run(c.id, c.content, c.source, c.agentRole, JSON.stringify(vecs[j]));
    }
    done += batch.length;
    console.log(`  Upserted ${done}/${chunks.length}`);
  }

  db.close();
  console.log(`Done — ${done} chunks stored in brain.db`);
}

main().catch(err => {
  console.error('Ingestion failed:', err);
  process.exit(1);
});
