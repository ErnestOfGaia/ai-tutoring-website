/**
 * OCHI booking proxy — public entry point for the OCHI lead funnel.
 *
 * The OCHI app (a SEPARATE deployment in the MCOS shell) cannot reach Mastra's
 * internal port. This route is reachable at https://ernestofgaia.xyz/api/ochi-booking
 * (frontend is the only publicly-routed container) and forwards to the Mastra
 * custom route /ochi-booking over the internal nginx-proxy network — exactly
 * like app/api/chat forwards to the routing-agent.
 *
 * Auth: validates the shared x-ochi-secret header here (this is the public
 * edge), then forwards it on to Mastra (which checks again, defense in depth).
 */

const MASTRA_URL = process.env.MASTRA_URL || "http://localhost:4111";

export async function POST(req: Request) {
  const expected = process.env.OCHI_BOOKING_SECRET;
  if (!expected) {
    console.error("[ochi-booking proxy] OCHI_BOOKING_SECRET unset — refusing");
    return Response.json({ ok: false, error: "not configured" }, { status: 503 });
  }
  if (req.headers.get("x-ochi-secret") !== expected) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: string;
  try {
    body = JSON.stringify(await req.json());
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(`${MASTRA_URL}/ochi-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ochi-secret": expected,
      },
      body,
    });

    const data = await res.json().catch(() => ({ ok: false, error: "bad upstream response" }));
    if (!res.ok) {
      console.error(`[ochi-booking proxy] Mastra non-OK ${res.status}:`, JSON.stringify(data).slice(0, 500));
    }
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("[ochi-booking proxy] error:", err);
    return Response.json({ ok: false, error: "upstream unreachable" }, { status: 502 });
  }
}
