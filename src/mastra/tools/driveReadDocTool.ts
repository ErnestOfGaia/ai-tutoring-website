/**
 * driveReadDocTool — read the contents of a Drive file by id.
 *
 * Google Docs are exported as text/plain. Other types return metadata + a link.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { driveClient } from '../lib/googleAuth.js';

const MAX_CHARS = 30_000;

export const driveReadDocTool = createTool({
  id: 'drive-read-doc',
  description:
    'Read the text contents of a Drive file (typically a Google Doc) by its id. ' +
    'Use this when Ernest asks to summarize a doc, or when the agent needs the ' +
    'doc text to answer a visitor question. Pair with drive-find-file to resolve ' +
    'a name to an id first.',
  inputSchema: z.object({
    fileId: z.string(),
  }),
  outputSchema: z.object({
    name:     z.string(),
    mimeType: z.string(),
    content:  z.string(),
    truncated: z.boolean(),
  }),
  execute: async ({ context }) => {
    const { fileId } = context;
    const drive = await driveClient();

    const meta = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink',
    });

    const mimeType = meta.data.mimeType || '';
    let content = '';

    if (mimeType === 'application/vnd.google-apps.document') {
      const exp = await drive.files.export({
        fileId,
        mimeType: 'text/plain',
      }, { responseType: 'text' });
      content = String(exp.data || '');
    } else if (mimeType.startsWith('text/') || mimeType === 'application/json') {
      const dl = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'text' });
      content = String(dl.data || '');
    } else {
      content = `[Binary or unsupported file type ${mimeType}. View at ${meta.data.webViewLink || ''}]`;
    }

    const truncated = content.length > MAX_CHARS;
    if (truncated) content = content.slice(0, MAX_CHARS);

    return {
      name:     meta.data.name || '',
      mimeType,
      content,
      truncated,
    };
  },
});
