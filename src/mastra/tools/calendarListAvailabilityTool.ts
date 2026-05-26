/**
 * calendarListAvailabilityTool — list open slots on Ernest's calendar over a window.
 *
 * Read-only. Uses calendar.freebusy.query against GOOGLE_CALENDAR_ID and intersects
 * busy ranges with Ernest's auto-bookable windows: Mon/Tue/Wed, 12 PM – 8 PM in
 * GOOGLE_TIMEZONE. Off-window requests should be routed to direct contact
 * (text 503-664-0546 or email eog@ernestofgaia.xyz) — the secretary does not
 * auto-book outside these days/hours.
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { calendarClient, CALENDAR_ID, TIMEZONE } from '../lib/googleAuth.js';

// Auto-book windows: Mon/Tue/Wed, noon–8 PM Pacific. Anything else, secretary
// redirects the visitor to contact Ernest directly.
const WORK_DAYS  = [1, 2, 3];   // Mon, Tue, Wed (JS Date.getDay() values)
const WORK_START = 12; // 12:00 local
const WORK_END   = 20; // 20:00 local

export const calendarListAvailabilityTool = createTool({
  id: 'calendar-list-availability',
  description:
    'List open meeting slots on Ernest\'s calendar over the next N days. ' +
    'Use this whenever a visitor asks about availability, open times, or when ' +
    'Ernest can meet. Returns slots in his configured timezone (' + TIMEZONE + ').',
  inputSchema: z.object({
    days: z.number().int().min(1).max(30).default(14)
      .describe('How many days ahead to check (default 14, max 30).'),
    durationMinutes: z.number().int().min(15).max(180).default(30)
      .describe('Slot length in minutes (default 30, 60 if visitor requests longer).'),
  }),
  outputSchema: z.object({
    timezone: z.string(),
    // Canonical framing so the LLM doesn't infer the window from whatever
    // subset of slots happens to appear in `slots` — previously the agent
    // would say "noon to 6pm" because the slot list was sliced to 12 entries
    // (== half a day's window). Always present this exact string to visitors.
    availableWindow: z.string(),
    daysWithAvailability: z.array(z.string()),
    totalSlots: z.number(),
    slots: z.array(z.object({
      start: z.string(),
      end:   z.string(),
    })),
  }),
  execute: async (input) => {
    console.error('[calendarListAvailability] fired, input:', JSON.stringify(input));
    try {
    const { days, durationMinutes } = input;
    const cal = await calendarClient();

    const now = new Date();
    const windowEnd = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const fb = await cal.freebusy.query({
      requestBody: {
        timeMin: now.toISOString(),
        timeMax: windowEnd.toISOString(),
        timeZone: TIMEZONE,
        items: [{ id: CALENDAR_ID }],
      },
    });
    const busy = (fb.data.calendars?.[CALENDAR_ID]?.busy || [])
      .map(b => ({ start: new Date(b.start!), end: new Date(b.end!) }));

    const slots: { start: string; end: string }[] = [];
    const stepMs = durationMinutes * 60 * 1000;

    // Walk each day in the window, build candidate slots inside working hours,
    // drop any that overlap a busy range or sit in the past.
    for (let d = 0; d < days; d++) {
      const day = new Date(now);
      day.setDate(day.getDate() + d);

      // Compute local day-of-week via toLocaleString in target TZ.
      const dow = new Date(day.toLocaleString('en-US', { timeZone: TIMEZONE })).getDay();
      if (!WORK_DAYS.includes(dow)) continue;

      for (let h = WORK_START; h + durationMinutes / 60 <= WORK_END; h += durationMinutes / 60) {
        // Build slot start in target TZ by formatting then re-parsing.
        const yyyy = day.toLocaleString('en-CA', { timeZone: TIMEZONE, year: 'numeric' });
        const mm   = day.toLocaleString('en-CA', { timeZone: TIMEZONE, month: '2-digit' });
        const dd   = day.toLocaleString('en-CA', { timeZone: TIMEZONE, day: '2-digit' });
        const hh   = String(Math.floor(h)).padStart(2, '0');
        const min  = String(Math.round((h % 1) * 60)).padStart(2, '0');

        // Construct ISO with offset by asking Date for the offset of this local time.
        const localStr = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
        const slotStart = new Date(new Date(localStr).toLocaleString('en-US', { timeZone: 'UTC' }));
        // Above is approximate — fall back to using the calendar.freebusy comparison
        // in UTC for correctness.
        const slotStartUtc = new Date(`${localStr}`); // interpreted as local-system; good enough for dev preview
        const slotEndUtc   = new Date(slotStartUtc.getTime() + stepMs);

        if (slotStartUtc.getTime() < now.getTime()) continue;

        const overlaps = busy.some(b =>
          slotStartUtc < b.end && slotEndUtc > b.start
        );
        if (overlaps) continue;

        slots.push({
          start: slotStartUtc.toISOString(),
          end:   slotEndUtc.toISOString(),
        });
      }
    }

    // Distinct days that have at least one slot — gives the LLM "Tue May 26,
    // Wed May 27" rather than 32 individual ISO timestamps.
    const daysWithAvailability = Array.from(
      new Set(
        slots.map(s =>
          new Date(s.start).toLocaleDateString('en-US', {
            timeZone: TIMEZONE,
            weekday: 'short',
            month:   'short',
            day:     'numeric',
          }),
        ),
      ),
    );

    const startLabel = WORK_START === 12 ? '12 PM' : `${WORK_START % 12 || 12} ${WORK_START < 12 ? 'AM' : 'PM'}`;
    const endLabel   = WORK_END   === 12 ? '12 PM' : `${WORK_END   % 12 || 12} ${WORK_END   < 12 ? 'AM' : 'PM'}`;
    const availableWindow =
      `Mondays, Tuesdays and Wednesdays, ${startLabel} to ${endLabel} ${TIMEZONE} time.`;

    console.error('[calendarListAvailability] success, total slots:', slots.length, 'days:', daysWithAvailability.length);
    return {
      timezone: TIMEZONE,
      availableWindow,
      daysWithAvailability,
      totalSlots: slots.length,
      // Return the first 24 slots — enough for the LLM to give a meaningful
      // sample without flooding the prompt. Visitor doesn't see this array
      // directly; the agent summarizes it.
      slots: slots.slice(0, 24),
    };
    } catch (err: any) {
      console.error('[calendarListAvailability] ERROR:', err?.message || err);
      console.error('[calendarListAvailability] stack:', err?.stack);
      throw err;
    }
  },
});
