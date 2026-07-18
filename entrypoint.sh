#!/bin/sh
# Mastra container startup.
#
# brain.json lives on a named volume at /app/data/brain.json.
# First boot: volume is empty → ingest runs in the BACKGROUND (~90 min at
#   Voyage free tier) while the server starts immediately. Until ingest
#   finishes, searchKnowledgeTool returns empty results and the agents
#   defer warmly ("Ernest will walk you through that when you connect").
# Subsequent restarts: brain.json exists and no resume sentinel → skip ingest.
#
# Deliberately NO `set -e`: nothing in this script — least of all a
# knowledge-base refresh — may prevent the server from starting. On
# 2026-07-18 a failed `git clone` inside the (then-foreground) ingest
# crash-looped the container and took /api/chat down for the duration.
#
# The .brain-ingest-incomplete sentinel is written by ingest-brain.mjs at
# start and removed on success. If a background ingest is interrupted
# (deploy, docker stop), the sentinel survives on the volume and the next
# boot resumes the ingest — already-embedded chunks are skipped, so a
# resume only pays for what is missing.
#
# To force a full re-ingest:
#   docker exec ernestofgaia_mastra rm /app/data/brain.json
#   docker compose restart mastra
# To re-run a given-up ingest without restarting the server:
#   docker exec ernestofgaia_mastra node /app/src/scripts/ingest-brain.mjs

mkdir -p /app/data

run_ingest_with_retries() {
  # Transient failures (GitHub blip, DNS, Voyage rate limits) heal on retry;
  # the ingest is resumable, so each attempt only redoes what is missing.
  # 5 attempts, doubling backoff: 1m, 2m, 4m, 8m between them (~15 min span).
  attempt=1
  delay=60
  while [ "$attempt" -le 5 ]; do
    echo "[ingest] Attempt $attempt/5..."
    if node /app/src/scripts/ingest-brain.mjs; then
      echo "[ingest] Complete."
      return 0
    fi
    if [ "$attempt" -lt 5 ]; then
      echo "[ingest] Attempt $attempt failed — retrying in ${delay}s."
      sleep "$delay"
      delay=$((delay * 2))
    fi
    attempt=$((attempt + 1))
  done
  echo "[ingest] Giving up after 5 attempts — server keeps running WITHOUT the knowledge base."
  echo "[ingest] searchKnowledgeTool returns empty results; agents defer to Ernest."
  echo "[ingest] Retry manually: docker exec ernestofgaia_mastra node /app/src/scripts/ingest-brain.mjs"
  return 1
}

if [ ! -f "/app/data/brain.json" ] || [ -f "/app/data/.brain-ingest-incomplete" ]; then
  if [ ! -f "/app/data/brain.json" ]; then
    echo "[entrypoint] brain.json not found — starting ingest in background (~90 min at free tier)"
  else
    echo "[entrypoint] Previous ingest was interrupted — resuming in background."
  fi
  echo "[entrypoint] VOYAGE_API_KEY set: $([ -n "$VOYAGE_API_KEY" ] && echo yes || echo 'NO — INGEST WILL FAIL')"
  run_ingest_with_retries &
else
  echo "[entrypoint] brain.json found ($(wc -c < /app/data/brain.json) bytes) — skipping ingest."
fi

echo "[entrypoint] Starting Mastra server on port 4111..."
exec node /app/.mastra/output/index.mjs
