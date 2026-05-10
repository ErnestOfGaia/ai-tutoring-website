/**
 * gmailSearchThreadsTool — search recent threads in eog@ernestofgaia.xyz inbox.
 *
 * Read-only. Wraps users.threads.list + users.threads.get. Query syntax is
 * standard Gmail search: from:, to:, subject:, newer_than:7d, etc.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { gmailClient } from '../lib/googleAuth.js';

function header(headers: any[] | undefined, name: string): string {
  return (headers || []).find(h => h.name?.toLowerCase() === name.toLowerCase())?.value || '';
}

export const gmailSearchThreadsTool = createTool({
  id: 'gmail-search-threads',
  description:
    'Search Ernest\'s Gmail for recent threads. Use Gmail search syntax in the ' +
    'query (from:, subject:, newer_than:7d, etc). Use this when a visitor asks ' +
    '"did Ernest get my email?" or when checking for prior context before ' +
    'drafting a reply. Read-only — never sends.',
  inputSchema: z.object({
    query:      z.string().describe('Gmail search query, e.g. "from:sarah@example.com newer_than:14d"'),
    maxResults: z.number().int().min(1).max(20).default(5),
  }),
  outputSchema: z.object({
    threads: z.array(z.object({
      threadId: z.string(),
      subject:  z.string(),
      from:     z.string(),
      date:     z.string(),
      snippet:  z.string(),
    })),
  }),
  execute: async ({ context }) => {
    const { query, maxResults } = context;
    const gmail = await gmailClient();

    const list = await gmail.users.threads.list({
      userId: 'me',
      q: query,
      maxResults,
    });

    const threads = await Promise.all(
      (list.data.threads || []).map(async t => {
        const detail = await gmail.users.threads.get({
          userId: 'me',
          id: t.id!,
          format: 'metadata',
          metadataHeaders: ['Subject', 'From', 'Date'],
        });
        const firstMsg = detail.data.messages?.[0];
        const headers  = firstMsg?.payload?.headers || [];
        return {
          threadId: t.id!,
          subject:  header(headers, 'Subject'),
          from:     header(headers, 'From'),
          date:     header(headers, 'Date'),
          snippet:  detail.data.messages?.[detail.data.messages.length - 1]?.snippet || '',
        };
      })
    );

    return { threads };
  },
});
