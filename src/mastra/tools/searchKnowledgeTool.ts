/**
 * searchKnowledgeTool — Mastra tool that agents call to retrieve context from
 * the agentic-brain knowledge base stored in brain.json.
 *
 * Flow: embed query with Voyage AI → cosine similarity over all chunks → return top-K.
 *
 * Degrades gracefully instead of crashing the agent: a missing VOYAGE_API_KEY,
 * a missing/corrupt brain.json (first boot — background ingest still running),
 * or a Voyage API failure all return an empty result set. The agents' prompts
 * already handle empty results by deferring warmly to Ernest. Failures are
 * logged server-side so they stay visible in `docker logs`.
 *
 * brain.json is re-read when its mtime changes, so chunks written by the
 * background ingest (which saves after every batch) become searchable live,
 * without a server restart.
 *
 * Debug: set DEBUG_RAG=true in .env to log every retrieval (query, top-5 scores,
 * source files, content previews) to the Mastra server console. Use this during
 * agent testing to verify RAG is pulling the expected chunks.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────────────
// Use process.cwd() so the path works both locally and in Docker (/app/data/brain.json)
const DB_PATH   = path.resolve(process.cwd(), 'data/brain.json');
const MODEL     = 'voyage-3-lite';
const TOP_K     = 5;
const DEBUG_RAG = process.env.DEBUG_RAG === 'true';

// ── JSON store ────────────────────────────────────────────────────────────────
interface ChunkRecord {
  id:        string;
  content:   string;
  source:    string;
  agentRole: string;
  embedding: number[];
}

let _chunks: ChunkRecord[] | null = null;
let _loadedMtimeMs: number | null = null;

function getChunks(): ChunkRecord[] {
  if (!existsSync(DB_PATH)) {
    _chunks = null;
    _loadedMtimeMs = null;
    console.warn('[searchKnowledgeTool] brain.json not found — returning no results (ingest may still be running).');
    return [];
  }
  try {
    const mtimeMs = statSync(DB_PATH).mtimeMs;
    if (_chunks === null || mtimeMs !== _loadedMtimeMs) {
      _chunks = JSON.parse(readFileSync(DB_PATH, 'utf-8')) as ChunkRecord[];
      _loadedMtimeMs = mtimeMs;
      console.log(`[searchKnowledgeTool] Loaded ${_chunks.length} chunks from brain.json`);
    }
    return _chunks;
  } catch (err) {
    // Torn read while the ingest rewrites the file, or a corrupt store —
    // degrade to empty and re-try on the next call.
    _chunks = null;
    _loadedMtimeMs = null;
    console.warn('[searchKnowledgeTool] Could not read brain.json — returning no results:', (err as Error).message);
    return [];
  }
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
    'their services, pricing tiers, background, professional history, infrastructure, ' +
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
      // Read lazily (not at module scope) — a missing key must degrade this
      // one tool, not crash every agent at import time.
      const voyageKey = process.env.VOYAGE_API_KEY;
      if (!voyageKey) {
        console.warn('[searchKnowledgeTool] VOYAGE_API_KEY not set — returning no results.');
        return { results: [] };
      }

      // No knowledge base yet → skip the embedding round-trip entirely.
      const chunks = getChunks();
      if (chunks.length === 0) {
        return { results: [] };
      }

      const body = JSON.stringify({ input: [input.query], model: MODEL });
      const voyageRes = await fetch('https://api.voyageai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${voyageKey}`,
        },
        body,
      });
      if (!voyageRes.ok) {
        const text = await voyageRes.text();
        throw new Error(`Voyage API error ${voyageRes.status}: ${text}`);
      }
      const embedJson = await voyageRes.json() as { data: Array<{ embedding: number[] }> };
      const queryVec  = embedJson.data[0]?.embedding ?? [];

      // Score every chunk by cosine similarity and return top-K
      const scored = chunks
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
      // Never propagate — a knowledge-base hiccup must not fail the chat turn.
      // Empty results trigger the agents' defer-warmly path.
      console.error('[searchKnowledgeTool] ERROR (returning no results):', err);
      return { results: [] };
    }
  },
});
