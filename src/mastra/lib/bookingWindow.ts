/**
 * bookingWindow — single source of truth for Ernest's auto-book window.
 *
 * The window (which weekdays, plus the start/end hours) is read from env so it
 * can change seasonally WITHOUT a code deploy. BOTH calendarListAvailabilityTool
 * (slot generation) and calendarBookEventTool (the server-side booking guard)
 * import from here, so the availability a visitor is shown and the times the
 * booking tool will actually accept can never drift apart — or from what Ernest
 * has actually set as his days off.
 *
 * Env (all optional — defaults are Ernest's current Sun/Mon/Tue, noon–8 PM):
 *   AUTO_BOOK_DAYS   comma-separated JS weekday indices, Sun=0 … Sat=6.  Default "0,1,2".
 *   AUTO_BOOK_START  local start hour, 0–23.                              Default 12 (noon).
 *   AUTO_BOOK_END    local end hour,   1–24.                              Default 20 (8 PM).
 *
 * All wall-clock reasoning happens in TIMEZONE (America/Los_Angeles by default)
 * via Intl — never the container's local TZ (which is UTC in prod and was the
 * source of the old 7–8 h-wrong-slot bug).
 */

import { TIMEZONE } from './googleAuth.js';

const DAY_PLURAL = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
const WEEKDAY_IDX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function parseDays(raw: string | undefined): number[] {
  const days = (raw ?? '0,1,2')
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isInteger(n) && n >= 0 && n <= 6);
  return days.length ? Array.from(new Set(days)).sort((a, b) => a - b) : [0, 1, 2];
}

function parseHour(raw: string | undefined, def: number, min: number, max: number): number {
  const n = parseInt(raw ?? '', 10);
  return Number.isInteger(n) && n >= min && n <= max ? n : def;
}

export const AUTO_BOOK_DAYS = parseDays(process.env.AUTO_BOOK_DAYS);
export const AUTO_BOOK_START = parseHour(process.env.AUTO_BOOK_START, 12, 0, 23);
export const AUTO_BOOK_END = parseHour(process.env.AUTO_BOOK_END, 20, 1, 24);

// ── Timezone helpers (Intl-based, no container-TZ dependency) ──────────────────

/** Offset (ms) between UTC and TIMEZONE at the given instant. */
function tzOffsetMs(instant: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(instant);
  const v: Record<string, string> = {};
  for (const p of parts) v[p.type] = p.value;
  let hour = parseInt(v.hour, 10);
  if (hour === 24) hour = 0; // some ICU builds emit "24" for midnight
  const asUTC = Date.UTC(+v.year, +v.month - 1, +v.day, hour, +v.minute, +v.second);
  return asUTC - instant.getTime();
}

/**
 * The UTC instant for a wall-clock time (Y-M-D H:M) in TIMEZONE. Treats the wall
 * time as if it were UTC, then subtracts the zone's offset at that instant.
 * Exact except inside a DST-transition hour (~2 AM) — never a booking hour, so
 * the single-pass correction is exact for this use.
 */
export function zonedWallTimeToUtc(
  year: number, month: number, day: number, hour: number, minute: number,
): Date {
  const guessUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset = tzOffsetMs(new Date(guessUtcMs));
  return new Date(guessUtcMs - offset);
}

/** Local calendar date + weekday (0-6) of an instant, evaluated in TIMEZONE. */
export function zonedDate(instant: Date): { year: number; month: number; day: number; weekday: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
  }).formatToParts(instant);
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? '';
  return { year: +get('year'), month: +get('month'), day: +get('day'), weekday: WEEKDAY_IDX[get('weekday')] };
}

/** Local weekday (0-6) + decimal hour (13.5 = 1:30 PM) of an instant, in TIMEZONE. */
function zonedDayHour(instant: Date): { weekday: number; decimalHour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(instant);
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? '';
  let hour = parseInt(get('hour'), 10);
  if (hour === 24) hour = 0;
  return { weekday: WEEKDAY_IDX[get('weekday')], decimalHour: hour + parseInt(get('minute'), 10) / 60 };
}

// ── Public predicates ──────────────────────────────────────────────────────────

/**
 * True iff [start, end) is a valid auto-bookable slot: a forward interval that
 * begins on an allowed weekday and sits entirely within [AUTO_BOOK_START,
 * AUTO_BOOK_END) local time. This is the code-level guard the booking tool
 * enforces — the LLM prompt is advisory only.
 */
export function isBookable(start: Date, end: Date): boolean {
  if (!(start instanceof Date) || isNaN(start.getTime())) return false;
  if (!(end instanceof Date) || isNaN(end.getTime())) return false;
  if (end.getTime() <= start.getTime()) return false;
  const { weekday, decimalHour } = zonedDayHour(start);
  if (!AUTO_BOOK_DAYS.includes(weekday)) return false;
  if (decimalHour < AUTO_BOOK_START) return false;
  const durationHours = (end.getTime() - start.getTime()) / 3_600_000;
  if (decimalHour + durationHours > AUTO_BOOK_END) return false;
  return true;
}

/** Human framing generated from config, e.g. "Sundays, Mondays and Tuesdays, 12 PM to 8 PM …". */
export function windowLabel(): string {
  const names = AUTO_BOOK_DAYS.map((d) => DAY_PLURAL[d]);
  const dayStr =
    names.length <= 1 ? (names[0] ?? '(no days configured)')
    : names.length === 2 ? `${names[0]} and ${names[1]}`
    : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  const hr = (h: number) => {
    const period = h >= 12 && h < 24 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12} ${period}`;
  };
  return `${dayStr}, ${hr(AUTO_BOOK_START)} to ${hr(AUTO_BOOK_END)} ${TIMEZONE} time.`;
}
