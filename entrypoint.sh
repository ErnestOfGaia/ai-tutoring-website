#!/bin/sh
# Mastra container startup.
#
# brain.json lives on a named volume at /app/data/brain.json.
# First boot: volume is empty → run ingest (~90 min at Voyage AI free tier, 3 RPM).
# Subsequent restarts: brain.json exists → skip ingest and start immediately.
#
# To force a re-ingest:
#   docker exec ernestofgaia-mastra rm /app/data/brain.json
#   docker compose restart mastra

set -e

mkdir -p /app/data

if [ ! -f "/app/data/brain.json" ]; then
  echo "[entrypoint] brain.json not found — running ingest (~90 min at free tier)"
  echo "[entrypoint] VOYAGE_API_KEY set: $([ -n "$VOYAGE_API_KEY" ] && echo yes || echo 'NO — INGEST WILL FAIL')"
  # Call script directly (not via npm run ingest) — avoids the --env-file .env flag
  # which doesn't exist in Docker; env vars come from docker-compose environment: block
  node /app/src/scripts/ingest-brain.mjs
  echo "[entrypoint] Ingest complete."
else
  echo "[entrypoint] brain.json found ($(wc -c < /app/data/brain.json) bytes) — skipping ingest."
fi

echo "[entrypoint] Starting Mastra server on port 4111..."
exec node /app/.mastra/output/index.mjs
