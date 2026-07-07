/**
 * get-google-token.mjs — one-time script to get a Google OAuth refresh token.
 *
 * Run once locally (credentials passed via env so they never touch a file):
 *
 *   Windows PowerShell:
 *     $env:GOOGLE_OAUTH_CLIENT_ID="YOUR_ID"; $env:GOOGLE_OAUTH_CLIENT_SECRET="YOUR_SECRET"; node src/scripts/get-google-token.mjs
 *
 *   Mac/Linux:
 *     GOOGLE_OAUTH_CLIENT_ID=YOUR_ID GOOGLE_OAUTH_CLIENT_SECRET=YOUR_SECRET node src/scripts/get-google-token.mjs
 *
 * Approve as eog@ernestofgaia.xyz when the browser opens.
 * The refresh token prints to terminal — paste it into VPS .env as
 * GOOGLE_OAUTH_REFRESH_TOKEN=...
 */

import { createServer } from 'node:http';
import { exec } from 'node:child_process';
import { google } from 'googleapis';

const CLIENT_ID     = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI  = 'http://localhost:3333/oauth/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌  Set GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET env vars before running.');
  process.exit(1);
}

// MUST stay in sync with GOOGLE_SCOPES in src/mastra/lib/googleAuth.ts.
// Pruned 2026-07-06 (review finding #20) to only what live tools use:
// calendar.readonly is required for freebusy.query (calendar.events alone
// returns "Insufficient Permission" 403); calendar.events is the booking
// write path; gmail.compose is the eog@ heads-up draft (drafts only).
// gmail.readonly/labels/modify + drive.readonly were dropped — their tools are
// dormant. Re-add here (and in googleAuth.ts) only when a back-office feature
// needs them, behind a separate authenticated agent.
const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.compose',
];

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
  login_hint: 'eog@ernestofgaia.xyz',
});

console.log('\n──────────────────────────────────────────────────');
console.log('Opening browser… approve as eog@ernestofgaia.xyz');
console.log('\nIf browser does not open, visit:\n' + authUrl);
console.log('\n──────────────────────────────────────────────────');
console.log('Waiting on localhost:3333 …\n');

const open = process.platform === 'win32' ? 'start' :
             process.platform === 'darwin' ? 'open' : 'xdg-open';
exec(`${open} "${authUrl}"`);

const server = createServer(async (req, res) => {
  const url   = new URL(req.url, 'http://localhost:3333');
  const code  = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.end(`<h2>Error: ${error}</h2>`);
    console.error('OAuth error:', error);
    server.close();
    return;
  }
  if (!code) {
    res.end('<h2>No code — try again.</h2>');
    return;
  }

  try {
    const { tokens } = await oauth2.getToken(code);
    res.end('<h2>✅ Done — check your terminal for the refresh token. Close this tab.</h2>');

    console.log('\n══════════════════════════════════════════════════');
    console.log('✅  Add these three lines to your VPS .env:\n');
    console.log(`GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('\n══════════════════════════════════════════════════\n');
  } catch (err) {
    res.end(`<h2>Token exchange error: ${err.message}</h2>`);
    console.error(err);
  }

  server.close();
});

server.listen(3333);
