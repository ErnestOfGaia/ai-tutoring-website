/**
 * calendarBookEventTool — create a calendar event for a discovery call.
 *
 * Single-step. When the agent calls this tool, the event is created immediately
 * and a Google Calendar invite goes to the visitor. The "are you sure?" gate
 * lives in the secretary agent's prompt — the agent MUST recap the booking
 * details and get an explicit visitor "yes" BEFORE calling this tool. The
 * previous two-step propose/confirm flow was removed because LLMs reliably
 * fail to flip a `confirm` flag on the second call; they treat the first
 * (propose) call as completion and never re-invoke the tool.
 *
 * Side effect: on successful booking, a Gmail draft TO eog@ernestofgaia.xyz
 * is created summarizing the new booking — heads-up for Ernest in his inbox.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { calendarClient, gmailClient, CALENDAR_ID, TIMEZONE, IMPERSONATE } from '../lib/googleAuth.js';

export const calendarBookEventTool = createTool({
  id: 'calendar-book-event',
  description:
    'Book a discovery call on Ernest\'s calendar. Single-step: when called, ' +
    'the event is created immediately and a Google Calendar invite is sent to ' +
    'the visitor. CRITICAL: do not call this tool until you have recapped the ' +
    'visitor name, email, date and time back to the visitor in plain text and ' +
    'they have replied with an explicit affirmative (yes / confirm / book it). ' +
    'Default duration 30 minutes; use 60 only if the visitor explicitly asks.',
  inputSchema: z.object({
    start:        z.string().describe('ISO 8601 start time, e.g. 2026-05-26T13:00:00-07:00'),
    end:          z.string().describe('ISO 8601 end time'),
    visitorName:  z.string(),
    visitorEmail: z.string().email(),
    summary:      z.string().default('Discovery call with Ernest Of Gaia'),
    description:  z.string().optional(),
  }),
  outputSchema: z.object({
    status:   z.literal('created'),
    eventId:  z.string().optional(),
    htmlLink: z.string().optional(),
    booked: z.object({
      start:        z.string(),
      end:          z.string(),
      summary:      z.string(),
      visitorName:  z.string(),
      visitorEmail: z.string(),
    }),
    eogDraftId: z.string().optional(),
  }),
  execute: async (input) => {
    console.error('[calendarBookEvent] fired, input:', JSON.stringify(input));
    try {
      const { start, end, visitorName, visitorEmail, summary, description } = input;

      const cal = await calendarClient();
      const res = await cal.events.insert({
        calendarId: CALENDAR_ID,
        sendUpdates: 'all',
        requestBody: {
          summary,
          description: description || `Discovery call booked via ernestofgaia.xyz secretaryAgent.`,
          start: { dateTime: start, timeZone: TIMEZONE },
          end:   { dateTime: end,   timeZone: TIMEZONE },
          attendees: [
            { email: IMPERSONATE, responseStatus: 'accepted' },
            { email: visitorEmail, displayName: visitorName },
          ],
          // Reminders are per-user in Google Calendar — these fire only for the
          // event organizer (eog@). The visitor gets whatever default reminders
          // their own Google account has set. Max 5 reminders per event, max
          // 40320 minutes (4 weeks) before — 14 days is the longest we can do.
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 14 * 24 * 60 }, // 2 weeks = 20160
              { method: 'email', minutes:  7 * 24 * 60 }, // 1 week  = 10080
              { method: 'email', minutes:      24 * 60 }, // 1 day   =  1440
              { method: 'email', minutes:           60 }, // 1 hour
            ],
          },
        },
      });

      const eventId  = res.data.id || undefined;
      const htmlLink = res.data.htmlLink || undefined;
      console.error('[calendarBookEvent] created event id:', eventId);

      // Side effect: draft a heads-up email TO Ernest summarizing the booking.
      // Wrapped in its own try so a draft failure does not roll back the
      // already-confirmed calendar event — that would lie to the visitor.
      let eogDraftId: string | undefined;
      try {
        const gmail = await gmailClient();
        const subject = `New discovery call booked: ${visitorName} — ${start}`;
        const body =
          `Hey Ernest,\n\n` +
          `A new discovery call was just booked through the secretary agent.\n\n` +
          `Visitor: ${visitorName} <${visitorEmail}>\n` +
          `When: ${start} (${TIMEZONE})\n` +
          `Through: ${end}\n` +
          `Calendar link: ${htmlLink || '(none returned)'}\n` +
          `Event ID: ${eventId || '(none returned)'}\n\n` +
          `— secretaryAgent`;

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
        console.error('[calendarBookEvent] eog draft created id:', eogDraftId);
      } catch (draftErr: any) {
        console.error('[calendarBookEvent] eog draft FAILED (event still booked):', draftErr?.message || draftErr);
      }

      return {
        status:   'created' as const,
        eventId,
        htmlLink,
        booked:   { start, end, summary, visitorName, visitorEmail },
        eogDraftId,
      };
    } catch (err: any) {
      console.error('[calendarBookEvent] ERROR:', err?.message || err);
      console.error('[calendarBookEvent] stack:', err?.stack);
      throw err;
    }
  },
});
