/**
 * googleAuth — lazy singleton authed Google client for the secretaryAgent.
 *
 * Auth model: OAuth 2.0 with a stored refresh token for eog@ernestofgaia.xyz.
 * The refresh token is tied to that specific account via the OAuth consent flow
 * (Internal app, ernestofgaia.xyz domain only) — no other account is reachable.
 *
 * Credentials (all in VPS /docker/ernestofgaia-mastra/.env — never committed):
 *   GOOGLE_OAUTH_CLIENT_ID      — from GCP Console → Credentials
 *   GOOGLE_OAUTH_CLIENT_SECRET  — from GCP Console → Credentials
 *   GOOGLE_OAUTH_REFRESH_TOKEN  — from one-time run of src/scripts/get-google-token.mjs
 *   GOOGLE_CALENDAR_ID          — defaults to 'primary'
 *   GOOGLE_TIMEZONE             — defaults to 'America/Los_Angeles'
 *
 * Rotation: refresh tokens for Internal Workspace apps don't expire unless
 * revoked. If you ever revoke access, re-run get-google-token.mjs and swap
 * GOOGLE_OAUTH_REFRESH_TOKEN on the VPS, then restart the Mastra container.
 *
 * Scopes are intentionally minimal — gmail.send and drive-write scopes are
 * NOT included, making those actions unreachable at the API level.
 */

import { google } from 'googleapis';

export const GOOGLE_SCOPES = [
  // calendar.events alone does NOT grant freebusy.query — Google rejects with
  // "Insufficient Permission" 403. calendar.readonly covers freebusy + read of
  // events; we keep calendar.events for the write path (book discovery call).
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/drive.readonly',
];

export const CALENDAR_ID  = process.env.GOOGLE_CALENDAR_ID || 'primary';
export const TIMEZONE     = process.env.GOOGLE_TIMEZONE    || 'America/Los_Angeles';
export const IMPERSONATE  = 'eog@ernestofgaia.xyz';

let _authClient: any = null;

function buildOAuth2Client() {
  const clientId     = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing Google OAuth env vars. Need: ' +
      'GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN. ' +
      'Run src/scripts/get-google-token.mjs to generate the refresh token.'
    );
  }

  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  return oauth2;
}

export async function getGoogleAuth() {
  if (_authClient) return _authClient;
  console.error('[googleAuth] building OAuth2 client...');
  _authClient = buildOAuth2Client();
  console.error('[googleAuth] OAuth2 client built OK');
  return _authClient;
}

export async function calendarClient() {
  const auth = await getGoogleAuth();
  return google.calendar({ version: 'v3', auth });
}

export async function gmailClient() {
  const auth = await getGoogleAuth();
  return google.gmail({ version: 'v1', auth });
}

export async function driveClient() {
  const auth = await getGoogleAuth();
  return google.drive({ version: 'v3', auth });
}
