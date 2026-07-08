/**
 * POST /ochi-booking — deterministic lead intake for the OCHI funnel.
 *
 * Public-facing surface is the ernestofgaia frontend proxy
 * (frontend/app/api/ochi-booking) which forwards here over the internal
 * nginx-proxy network. This route is NOT meant to be hit by browsers directly
 * (no CORS configured); it trusts a shared secret instead of Mastra auth.
 *
 * Auth: requiresAuth:false (skip Mastra's auth) + our own x-ochi-secret header
 * check against OCHI_BOOKING_SECRET. If the env var is unset the route is
 * disabled (503) — fail closed so an unconfigured deploy can't be abused to
 * spam Ernest's calendar.
 */

import { registerApiRoute } from '@mastra/core/server';
import { z } from 'zod';
import { createOchiLead, type OchiBookingRequest } from '../lib/ochiBooking.js';

const bodySchema = z.object({
  name: z.string().min(1),
  business: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  preferredTime: z.string().optional(),
  note: z.string().optional(),
  context: z
    .object({
      weeksCount: z.number(),
      avgOccupancy: z.number(),
      swingWeeks: z.number(),
    })
    .optional(),
});

export const ochiBookingRoute = registerApiRoute('/ochi-booking', {
  method: 'POST',
  requiresAuth: false,
  handler: async (c) => {
    const expected = process.env.OCHI_BOOKING_SECRET;
    if (!expected) {
      console.error('[ochi-booking route] OCHI_BOOKING_SECRET unset — refusing (fail closed)');
      return c.json({ ok: false, error: 'booking endpoint not configured' }, 503);
    }
    if (c.req.header('x-ochi-secret') !== expected) {
      console.error('[ochi-booking route] bad/missing x-ochi-secret');
      return c.json({ ok: false, error: 'unauthorized' }, 401);
    }

    let raw: unknown;
    try {
      raw = await c.req.json();
    } catch {
      return c.json({ ok: false, error: 'invalid JSON' }, 400);
    }

    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      console.error('[ochi-booking route] validation failed:', parsed.error.issues);
      return c.json({ ok: false, error: 'invalid booking request' }, 400);
    }

    try {
      const result = await createOchiLead(parsed.data as OchiBookingRequest);
      return c.json(result, 200);
    } catch (err: any) {
      // Google call failed — surface as 502 so the caller shows its fallback
      // (text/email Ernest) instead of falsely claiming success.
      console.error('[ochi-booking route] createOchiLead ERROR:', err?.message || err);
      console.error('[ochi-booking route] stack:', err?.stack);
      return c.json({ ok: false, error: 'booking failed' }, 502);
    }
  },
});
