/**
 * gmailDraftReplyTool — create a Gmail draft. Never sends.
 *
 * The auth scopes deliberately exclude gmail.send, so even if the LLM tried to
 * send, the API would reject it. Drafts land in Ernest's web UI for review.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { gmailClient, IMPERSONATE } from '../lib/googleAuth.js';

function buildRfc822(to: string, from: string, subject: string, body: string, inReplyTo?: string): string {
  const lines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
  ];
  if (inReplyTo) {
    lines.push(`In-Reply-To: ${inReplyTo}`);
    lines.push(`References: ${inReplyTo}`);
  }
  lines.push('', body);
  return lines.join('\r\n');
}

export const gmailDraftReplyTool = createTool({
  id: 'gmail-draft-reply',
  description:
    'Create a Gmail draft for Ernest to review. NEVER sends — Ernest reviews ' +
    'every draft in the Gmail UI before it goes out. Pass threadId to attach ' +
    'the draft to an existing conversation.',
  inputSchema: z.object({
    to:       z.string(),
    subject:  z.string(),
    body:     z.string(),
    threadId: z.string().optional(),
  }),
  outputSchema: z.object({
    draftId:  z.string(),
    gmailUrl: z.string(),
  }),
  execute: async (input) => {
    console.error('[gmailDraftReply] fired, input:', JSON.stringify({ ...input, body: '<redacted>' }));
    try {
      const { to, subject, body, threadId } = input;
      const gmail = await gmailClient();

      const raw = Buffer.from(buildRfc822(to, IMPERSONATE, subject, body))
        .toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      const res = await gmail.users.drafts.create({
        userId: 'me',
        requestBody: {
          message: {
            raw,
            ...(threadId ? { threadId } : {}),
          },
        },
      });

      console.error('[gmailDraftReply] draft created id:', res.data.id);
      return {
        draftId:  res.data.id!,
        gmailUrl: `https://mail.google.com/mail/u/0/#drafts`,
      };
    } catch (err: any) {
      console.error('[gmailDraftReply] ERROR:', err?.message || err);
      console.error('[gmailDraftReply] stack:', err?.stack);
      throw err;
    }
  },
});
