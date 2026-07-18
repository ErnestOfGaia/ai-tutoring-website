/**
 * calendarListAvailabilityTool — list open slots on Ernest's calendar over a window.
 *
 * Read-only. Uses calendar.freebusy.query against GOOGLE_CALENDAR_ID and
 * intersects busy ranges with Ernest's auto-book window (days + hours from
 * src/mastra/lib/bookingWindow — env-configurable, and evaluated in TIMEZONE via
 * Intl so slot instants are correct regardless of the container's clock, which
 * runs UTC in prod). Off-window requests are routed to direct contact
 * (text 503-664-0546 or email eog@ernestofgaia.xyz).
 */

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { calendarClient, CALENDAR_ID, TIMEZONE } from '../lib/googleAuth.js';
import {
  AUTO_BOOK_DAYS,
  AUTO_BOOK_START,
  AUTO_BOOK_END,
  zonedDate,
  zonedWallTimeToUtc,
  windowLabel,
} from '../lib/bookingWindow.js';

export const calendarListAvailabilityTool = createTool({
  id: 'calendar-list-availability',
  description:
    'List open meeting slots on Ernest\'s calendar over the next N days. ' +
    'Use this whenever a visitor asks about availability, open times, or when ' +
    'Ernest can meet. Returns slots in their configured timezone (' + TIMEZONE + ').',
  inputSchema: z.object({
    days: z.number().int().min(1).max(30).default(14)
      .describe('How many days ahead to check (default 14, max 30).'),
    durationMinutes: z.number().int().min(15).max(180).default(30)
      .describe('Slot length in minutes (default 30, 60 if visitor requests longer).'),
  }),
  outputSchema: z.object({
    timezone: z.string(),
    // Canonical framing generated from the configured window so the LLM never
    // infers the window from whatever subset of slots happens to appear.
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
      // Zod defaults apply at runtime; coalesce here so the types are non-optional.
      const days = input.days ?? 14;
      const durationMinutes = input.durationMinutes ?? 30;
      const cal = await calendarClient();

      const now = new Date();
      const windowEnd = new Date(now.getTime() + days * 86_400_000);

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

      const stepHours  = durationMinutes / 60;
      const durationMs = durationMinutes * 60_000;
      const slots: { start: string; end: string }[] = [];
      const seenDates = new Set<string>();

      // Walk each calendar day in the window by its LOCAL date (deduped so a DST
      // day isn't doubled or skipped), keep only auto-book weekdays, build
      // candidate slots inside the window as true TIMEZONE instants, and drop any
      // that overlap a busy range or sit in the past.
      for (let d = 0; d <= days; d++) {
        const dayInstant = new Date(now.getTime() + d * 86_400_000);
        const { year, month, day, weekday } = zonedDate(dayInstant);
        const key = `${year}-${month}-${day}`;
        if (seenDates.has(key)) continue;
        seenDates.add(key);
        if (!AUTO_BOOK_DAYS.includes(weekday)) continue;

        for (let h = AUTO_BOOK_START; h + stepHours <= AUTO_BOOK_END; h += stepHours) {
          const hour   = Math.floor(h);
          const minute = Math.round((h - hour) * 60);
          const slotStart = zonedWallTimeToUtc(year, month, day, hour, minute);
          const slotEnd   = new Date(slotStart.getTime() + durationMs);

          if (slotStart.getTime() < now.getTime()) continue;
          if (busy.some(b => slotStart < b.end && slotEnd > b.start)) continue;

          slots.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() });
        }
      }

      // Distinct days that have at least one slot — gives the LLM "Sun Jul 5,
      // Mon Jul 6" rather than a wall of ISO timestamps.
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

      console.error('[calendarListAvailability] success, total slots:', slots.length, 'days:', daysWithAvailability.length);
      return {
        timezone: TIMEZONE,
        availableWindow: windowLabel(),
        daysWithAvailability,
        totalSlots: slots.length,
        // First 24 slots — enough for a meaningful sample without flooding the
        // prompt. The agent summarizes; the visitor never sees this array.
        slots: slots.slice(0, 24),
      };
    } catch (err: any) {
      console.error('[calendarListAvailability] ERROR:', err?.message || err);
      console.error('[calendarListAvailability] stack:', err?.stack);
      throw err;
    }
  },
});
