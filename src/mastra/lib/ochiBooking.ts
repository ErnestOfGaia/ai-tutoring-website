/**
 * ochiBooking — deterministic lead handoff from the OCHI funnel.
 *
 * The OCHI "your-read" page collects a booking REQUEST (free-text preferred
 * time, e.g. "weekday mornings") — NOT a confirmed slot. So unlike the
 * secretaryAgent's calendarBookEventTool (which books a specific ISO slot and
 * invites the visitor), this path does the honest thing the UX promises
 * ("Ernest's assistant will reach out to confirm your time"):
 *
 *   1. Drops an all-day "reach out to this lead" marker on Ernest's calendar
 *      with every detail in the description.
 *   2. Drafts a heads-up email TO eog@ summarizing the lead.
 *
 * Deterministic on purpose: no LLM in the loop. The secretaryAgent's Google
 * tools "fail silently" through the agent layer; this reuses the SAME proven
 * googleAuth clients directly, so a failure surfaces as a thrown error the
 * caller can turn into ok:false (OCHI then shows its text/email fallback).
 *
 * Scope note: gmail.send is NOT in GOOGLE_SCOPES, so we draft (compose) the
 * heads-up rather than send it — identical to calendarBookEventTool.
 */

import { calendarClient, gmailClient, CALENDAR_ID, TIMEZONE, IMPERSONATE } from './googleAuth.js';

export interface OchiBookingRequest {
  name: string;
  business?: string;
  email: string;
  phone?: string;
  preferredTime?: string;
  note?: string;
  context?: { weeksCount: number; avgOccupancy: number; swingWeeks: number };
}

export interface OchiBookingResult {
  ok: boolean;
  eventId?: string;
  htmlLink?: string;
  eogDraftId?: string;
}

// All-day calendar events use bare YYYY-MM-DD dates; `end.date` is exclusive.
function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildDetails(req: OchiBookingRequest): string {
  const lines = [
    `OCHI lead — reach out to schedule a 20-minute read-through.`,
    ``,
    `Name:      ${req.name}`,
    req.business      ? `Business:  ${req.business}`            : null,
    `Email:     ${req.email}`,
    req.phone         ? `Phone:     ${req.phone}`               : null,
    req.preferredTime ? `Prefers:   ${req.preferredTime}`       : null,
    req.note          ? `Note:      "${req.note}"`              : null,
    req.context
      ? `Their read: ${req.context.weeksCount} wks, ${req.context.avgOccupancy}% avg occupancy, ${req.context.swingWeeks} swing weeks`
      : null,
    ``,
    `Source: OCHI lodging-data funnel (Oregon Coastal Hospitality Intelligence).`,
  ];
  return lines.filter((l) => l !== null).join('\n');
}

export async function createOchiLead(req: OchiBookingRequest): Promise<OchiBookingResult> {
  console.error('[ochiBooking] fired, lead:', JSON.stringify({ name: req.name, email: req.email }));

  const details = buildDetails(req);

  // 1) Calendar marker — all-day on the next day so it reads as a clear
  //    "follow up with this lead" task, not a confirmed meeting. No visitor
  //    attendee: we are NOT inviting them to an unconfirmed time.
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() + 1);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const cal = await calendarClient();
  const res = await cal.events.insert({
    calendarId: CALENDAR_ID,
    sendUpdates: 'none',
    requestBody: {
      summary: `OCHI lead — reach out: ${req.name}${req.business ? ` (${req.business})` : ''}`,
      description: details,
      start: { date: ymd(start) },
      end:   { date: ymd(end) },
      transparency: 'transparent', // doesn't block Ernest's free/busy
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 0 },
          { method: 'email', minutes: 0 },
        ],
      },
    },
  });

  const eventId  = res.data.id || undefined;
  const htmlLink = res.data.htmlLink || undefined;
  console.error('[ochiBooking] calendar marker created id:', eventId);

  // 2) Heads-up draft TO Ernest. Wrapped so a draft failure does NOT fail the
  //    whole request — the calendar marker already captured the lead.
  let eogDraftId: string | undefined;
  try {
    const gmail = await gmailClient();
    const subject = `New OCHI lead: ${req.name}${req.business ? ` — ${req.business}` : ''}`;
    const body =
      `Hey Ernest,\n\n` +
      `A new lead came in through the OCHI lodging-data funnel and asked to book a ` +
      `20-minute read-through.\n\n` +
      details +
      `\n\nA reminder marker is on your calendar for tomorrow` +
      (htmlLink ? `:\n${htmlLink}\n` : `.\n`) +
      `\nReach out to confirm a time.\n\n— OCHI funnel`;

    const rfc822 =
      `To: ${IMPERSONATE}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset=UTF-8\r\n` +
      `\r\n` +
      body;
    const raw = Buffer.from(rfc822).toString('base64url');

    const draft = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: { message: { raw } },
    });
    eogDraftId = draft.data.id || undefined;
    console.error('[ochiBooking] eog draft created id:', eogDraftId);
  } catch (draftErr: any) {
    console.error('[ochiBooking] eog draft FAILED (lead still captured):', draftErr?.message || draftErr);
  }

  return { ok: true, eventId, htmlLink, eogDraftId };
}
