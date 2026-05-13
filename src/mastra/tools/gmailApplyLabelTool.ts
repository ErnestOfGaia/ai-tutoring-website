/**
 * gmailApplyLabelTool — apply a label to a thread, creating it if missing.
 *
 * Reversible (Ernest can remove the label in Gmail), so no confirm gate.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { gmailClient } from '../lib/googleAuth.js';

async function ensureLabelId(gmail: any, name: string): Promise<string> {
  const list = await gmail.users.labels.list({ userId: 'me' });
  const existing = (list.data.labels || []).find((l: any) => l.name === name);
  if (existing?.id) return existing.id;

  const created = await gmail.users.labels.create({
    userId: 'me',
    requestBody: {
      name,
      labelListVisibility:   'labelShow',
      messageListVisibility: 'show',
    },
  });
  return created.data.id!;
}

export const gmailApplyLabelTool = createTool({
  id: 'gmail-apply-label',
  description:
    'Apply a Gmail label to a thread for triage (e.g. "discovery-call-pending"). ' +
    'Creates the label if it does not exist. Use this to flag threads that need ' +
    'Ernest\'s follow-up.',
  inputSchema: z.object({
    threadId:  z.string(),
    labelName: z.string(),
  }),
  outputSchema: z.object({
    threadId: z.string(),
    labelId:  z.string(),
    applied:  z.boolean(),
  }),
  execute: async (input) => {
    console.error('[gmailApplyLabel] fired, input:', JSON.stringify(input));
    try {
      const { threadId, labelName } = input;
      const gmail = await gmailClient();

      const labelId = await ensureLabelId(gmail, labelName);
      await gmail.users.threads.modify({
        userId: 'me',
        id: threadId,
        requestBody: { addLabelIds: [labelId] },
      });

      console.error('[gmailApplyLabel] applied label', labelId, 'to thread', threadId);
      return { threadId, labelId, applied: true };
    } catch (err: any) {
      console.error('[gmailApplyLabel] ERROR:', err?.message || err);
      console.error('[gmailApplyLabel] stack:', err?.stack);
      throw err;
    }
  },
});
