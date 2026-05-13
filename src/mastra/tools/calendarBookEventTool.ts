/**
 * calendarBookEventTool — propose or create a calendar event.
 *
 * Confirmation gate: if `confirm` is false the tool returns the proposed event
 * without writing to Google. Only when `confirm: true` does it create the event
 * and send Google's calendar invite to the visitor.
 *
 * The agent is instructed to (1) propose, (2) wait for the visitor's "yes",
 * (3) call again with confirm:true. The schema-level requirement is the
 * structural backstop — the LLM cannot accidentally book without it.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { calendarClient, CALENDAR_ID, TIMEZONE, IMPERSONATE } from '../lib/googleAuth.js';

export const calendarBookEventTool = createTool({
  id: 'calendar-book-event',
  description:
    'Book a discovery call on Ernest\'s calendar. Two-step protocol: first call ' +
    'with confirm:false to show the visitor the proposed event details and get ' +
    'their explicit approval. Only call again with confirm:true after the ' +
    'visitor replies affirmatively. The visitor will receive a Google Calendar ' +
    'invite by email when confirmed.',
  inputSchema: z.object({
    start:        z.string().describe('ISO 8601 start time, e.g. 2026-05-15T17:00:00Z'),
    end:          z.string().describe('ISO 8601 end time'),
    visitorName:  z.string(),
    visitorEmail: z.string().email(),
    summary:      z.string().default('Discovery call with Ernest Of Gaia'),
    description: z.string().optional(),
    confirm: z.boolean().default(false)
      .describe('false = propose only; true = actually create the event.'),
  }),
  outputSchema: z.object({
    status: z.enum(['proposed', 'created']),
    proposed: z.object({
      start:        z.string(),
      end:          z.string(),
      summary:      z.string(),
      visitorName:  z.string(),
      visitorEmail: z.string(),
    }),
    eventId:  z.string().optional(),
    htmlLink: z.string().optional(),
  }),
  execute: async ({ context }) => {
    console.error('[calendarBookEvent] fired, context:', JSON.stringify(context));
    try {
      const { start, end, visitorName, visitorEmail, summary, description, confirm } = context;
      const proposed = { start, end, summary, visitorName, visitorEmail };

      if (!confirm) {
        console.error('[calendarBookEvent] proposed only (confirm=false)');
        return { status: 'proposed' as const, proposed };
      }

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
        },
      });

      console.error('[calendarBookEvent] created event id:', res.data.id);
      return {
        status:   'created' as const,
        proposed,
        eventId:  res.data.id || undefined,
        htmlLink: res.data.htmlLink || undefined,
      };
    } catch (err: any) {
      console.error('[calendarBookEvent] ERROR:', err?.message || err);
      console.error('[calendarBookEvent] stack:', err?.stack);
      throw err;
    }
  },
});
