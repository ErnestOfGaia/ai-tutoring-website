/**
 * searchKnowledgeTool — Mastra tool that agents call to retrieve context from
 * the agentic-brain knowledge base stored in brain.json.
 *
 * Flow: embed query with Voyage AI → cosine similarity over all chunks → return top-K.
 *
 * Debug: set DEBUG_RAG=true in .env to log every retrieval (query, top-5 scores,
 * source files, content previews) to the Mastra server console. Use this during
 * agent testing to verify RAG is pulling the expected chunks.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Config ────────────────────────────────────────────────────────────────────
// Use process.cwd() so the path works both locally and in Docker (/app/data/brain.json)
const DB_PATH   = path.resolve(process.cwd(), 'data/brain.json');
const MODEL     = 'voyage-3-lite';
const TOP_K     = 5;
const DEBUG_RAG = process.env.DEBUG_RAG === 'true';

// ── Voyage AI (direct REST — no SDK needed) ───────────────────────────────────
const voyageKey = process.env.VOYAGE_API_KEY;
if (!voyageKey) throw new Error('VOYAGE_API_KEY is not set in environment.');

// ── JSON store ────────────────────────────────────────────────────────────────
interface ChunkRecord {
  id:        string;
  content:   string;
  source:    string;
  agentRole: string;
  embedding: number[];
}

let _chunks: ChunkRecord[] | null = null;
function getChunks(): ChunkRecord[] {
  if (!existsSync(DB_PATH)) {
    throw new Error(
      'brain.json not found. Run `npm run ingest` to build the knowledge base first.'
    );
  }
  if (!_chunks) {
    _chunks = JSON.parse(readFileSync(DB_PATH, 'utf-8')) as ChunkRecord[];
  }
  return _chunks;
}

// ── Cosine similarity ────────────────────────────────────────────────────────
function cosine(a: number[], b: number[]): number {
  let dot = 0, ma = 0, mb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    ma  += a[i] * a[i];
    mb  += b[i] * b[i];
  }
  const denom = Math.sqrt(ma) * Math.sqrt(mb);
  return denom === 0 ? 0 : dot / denom;
}

// ── Tool definition ──────────────────────────────────────────────────────────
export const searchKnowledgeTool = createTool({
  id: 'search-knowledge',
  description:
    'Search the agentic-brain knowledge base for facts about Ernest Of Gaia — ' +
    'his services, pricing tiers, background, professional history, infrastructure, ' +
    'booking process, and brand identity. Call this before answering any question ' +
    'that requires specific details.',
  inputSchema: z.object({
    query: z.string().describe(
      'A natural-language question or topic to look up in the knowledge base'
    ),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        content: z.string(),
        source:  z.string(),
        score:   z.number(),
      })
    ),
  }),
  execute: async (input) => {
    try {
    // Embed query via curl — avoids Node 24/Windows native-fetch TLS segfault
    const body = JSON.stringify({ input: [input.query], model: MODEL });
    const raw = execFileSync('curl', [
      '-s',
      '-w', '\n__HTTP_STATUS__%{http_code}',
      '-X', 'POST',
      'https://api.voyageai.com/v1/embeddings',
      '-H', 'Content-Type: application/json',
      '-H', `Authorization: Bearer ${voyageKey}`,
      '--data', '@-',
    ], { input: body }).toString();

    const statusMatch = raw.match(/\n__HTTP_STATUS__(\d+)$/);
    const status      = statusMatch ? parseInt(statusMatch[1]) : 0;
    const jsonStr     = raw.replace(/\n__HTTP_STATUS__\d+$/, '').trim();
    if (status < 200 || status >= 300) throw new Error(`Voyage API error ${status}: ${jsonStr}`);

    const embedJson = JSON.parse(jsonStr) as { data: Array<{ embedding: number[] }> };
    const queryVec  = embedJson.data[0]?.embedding ?? [];

    // Score every chunk by cosine similarity and return top-K
    const scored = getChunks()
      .map(c => ({ content: c.content, source: c.source, score: cosine(queryVec, c.embedding) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    if (DEBUG_RAG) {
      console.log(`\n[searchKnowledgeTool] query: "${input.query}"`);
      scored.forEach((r, i) => {
        const preview = r.content.replace(/\s+/g, ' ').slice(0, 120);
        console.log(`  ${i + 1}. [${r.score.toFixed(4)}] ${r.source} — ${preview}${r.content.length > 120 ? '…' : ''}`);
      });
      console.log('');
    }

    return { results: scored };
    } catch (err) {
      console.error('[searchKnowledgeTool] ERROR:', err);
      throw err;
    }
  },
});
