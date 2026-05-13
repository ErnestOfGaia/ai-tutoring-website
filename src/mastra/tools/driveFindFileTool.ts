/**
 * driveFindFileTool — find a file in Ernest's Drive by name.
 *
 * Returns the existing webViewLink set by Ernest's sharing config. Does NOT
 * change permissions — that scope is not requested.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { driveClient } from '../lib/googleAuth.js';

export const driveFindFileTool = createTool({
  id: 'drive-find-file',
  description:
    'Find a file in Ernest\'s Google Drive by name (e.g. "intake form", ' +
    '"coaching contract"). Returns its share link verbatim. Does NOT change ' +
    'sharing permissions — Ernest sets those manually.',
  inputSchema: z.object({
    name:     z.string().describe('File name or partial name to search.'),
    mimeType: z.string().optional().describe('Optional MIME filter, e.g. application/vnd.google-apps.document'),
  }),
  outputSchema: z.object({
    files: z.array(z.object({
      id:          z.string(),
      name:        z.string(),
      mimeType:    z.string(),
      webViewLink: z.string(),
    })),
  }),
  execute: async (input) => {
    console.error('[driveFindFile] fired, input:', JSON.stringify(input));
    try {
      const { name, mimeType } = input;
      const drive = await driveClient();

      const escaped = name.replace(/'/g, "\\'");
      const qParts = [`name contains '${escaped}'`, 'trashed = false'];
      if (mimeType) qParts.push(`mimeType = '${mimeType}'`);

      const res = await drive.files.list({
        q: qParts.join(' and '),
        fields: 'files(id, name, mimeType, webViewLink)',
        pageSize: 10,
      });

      const files = (res.data.files || []).map(f => ({
        id:          f.id!,
        name:        f.name!,
        mimeType:    f.mimeType || '',
        webViewLink: f.webViewLink || '',
      }));
      console.error('[driveFindFile] success, files:', files.length);
      return { files };
    } catch (err: any) {
      console.error('[driveFindFile] ERROR:', err?.message || err);
      console.error('[driveFindFile] stack:', err?.stack);
      throw err;
    }
  },
});
