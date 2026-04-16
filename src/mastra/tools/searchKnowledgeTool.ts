/**
 * searchKnowledgeTool — Mastra tool that agents call to retrieve context from
 * the agentic-brain knowledge base stored in brain.db.
 *
 * Flow: embed query with Voyage AI → cosine similarity over all chunks → return top-K.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { DatabaseSync } from 'node:sqlite';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { VoyageAIClient } from 'voyageai';

// ── Config ────────────────────────────────────────────────────────────────────
const DB_PATH = path.resolve('brain.db');
const MODEL   = 'voyage-3-lite';
const TOP_K   = 5;

// ── Clients (module-level singletons) ────────────────────────────────────────
const voyageKey = process.env.VOYAGE_API_KEY;
if (!voyageKey) throw new Error('VOYAGE_API_KEY is not set in environment.');
const voyage = new VoyageAIClient({ apiKey: voyageKey });

let _db: DatabaseSync | null = null;
function getDb(): DatabaseSync {
  if (!existsSync(DB_PATH)) {
    throw new Error(
      'brain.db not found. Run `npm run ingest` to build the knowledge base first.'
    );
  }
  if (!_db) _db = new DatabaseSync(DB_PATH);
  return _db;
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
    const db = getDb();

    // Embed query
    const embedRes = await voyage.embed({ input: [input.query], model: MODEL });
    const queryVec = embedRes.data?.[0]?.embedding ?? [];

    // Load all chunks
    type Row = { content: string; source: string; embedding: string };
    const rows = db
      .prepare('SELECT content, source, embedding FROM brain_chunks')
      .all() as Row[];

    // Score by cosine similarity and return top-K
    const scored = rows
      .map(row => ({
        content: row.content,
        source:  row.source,
        score:   cosine(queryVec, JSON.parse(row.embedding) as number[]),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    return { results: scored };
  },
});
