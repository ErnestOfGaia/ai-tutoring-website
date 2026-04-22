# ernestofgaia_M_site — ernestofgaia.xyz

Main coaching site. Home of the **Router**, **Marketer**, **Secretary**, and **Recruiter** agents.

> **Master DNA reference:** [`Agent Brief - Master DNA.md`](../../../../Ideas%20%26%20Projects/Projects%20Management/Development%20Sprint%20Projects/Spring%20Sprint/Spring%20SprintTesting/Agent%20Brief%20-%20Master%20DNA.md) — canonical description of every agent.
> **Voice reference:** [`Voice & Brand DNA.md`](../../../../Ideas%20%26%20Projects/Projects%20Management/Marketing%20Projects/AI%20Coaching%20%26%20Tutoring%20copy/Voice%20%26%20Brand%20DNA.md)
> **Knowledge source:** `github.com/ErnestOfGaia/agentic-brain` → ingested into `brain.json` via `npm run ingest`

---

## Architecture at a Glance

- **Router** = regex classifier in [`frontend/app/api/chat/route.ts`](frontend/app/api/chat/route.ts). **NOT an LLM, NOT a Mastra agent.** Forwards to sub-agent via `${MASTRA_URL}/api/agents/{id}/generate`.
- **Marketer / Secretary / Recruiter** = real Mastra agents defined in [`src/mastra/agents/index.ts`](src/mastra/agents/index.ts). Model: `anthropic/claude-haiku-4-5`. Each uses `searchKnowledgeTool` for RAG + `Memory()`.
- **`src/mastra/agents/routingAgent.ts`** = **dead stub**. Not registered in `src/mastra/index.ts`. Do not edit without removing or reviving intentionally.
- **RAG:** Voyage AI `voyage-3-lite` embeddings, cosine similarity over `brain.json` (top-5). See [`src/mastra/tools/searchKnowledgeTool.ts`](src/mastra/tools/searchKnowledgeTool.ts).
- **Ingest:** `npm run ingest` clones the `agentic-brain` GitHub repo, chunks markdown, embeds, writes `brain.json`.

## Required Environment

- `ANTHROPIC_API_KEY`
- `VOYAGE_API_KEY` (required by `searchKnowledgeTool` — will throw at module load if missing)
- `MASTRA_URL` (defaults to `http://localhost:4111`)
- `DEBUG_RAG` *(optional — set to `"true"` during testing)*. Turns on two things:
  1. Console logs every retrieval inside `searchKnowledgeTool` (query, top-5 with score + source + preview).
  2. Appends a `Sources: file1.md, file2.md` footer to every agent reply.

  Leave unset in prod — the voice spec ("plain text only, no markdown") takes over.

## Known Gaps (see Master DNA §4 for full list)

- Router has no "resume" intent yet → should direct work-history questions to `resume.ernestofgaia.xyz` (new tab).
- Not yet on VPS. Currently local-only.
- `routingAgent.ts` stub should be deleted or revived — leaving it as-is risks a false assumption.

## Startup

```bash
npm run dev   # Mastra Studio at http://localhost:4111
# In a separate terminal (for the Next.js frontend):
cd frontend && npm run dev   # Next.js at http://localhost:3000
```

---

*Mastra framework boilerplate below preserved.*

---

Welcome to your new [Mastra](https://mastra.ai/) project! We're excited to see what you'll build.

## Getting Started

Start the development server:

```shell
npm run dev
```

Open [http://localhost:4111](http://localhost:4111) in your browser to access [Mastra Studio](https://mastra.ai/docs/studio/overview). It provides an interactive UI for building and testing your agents, along with a REST API that exposes your Mastra application as a local service. This lets you start building without worrying about integration right away.

You can start editing files inside the `src/mastra` directory. The development server will automatically reload whenever you make changes.

## Learn more

To learn more about Mastra, visit our [documentation](https://mastra.ai/docs/). Your bootstrapped project includes example code for [agents](https://mastra.ai/docs/agents/overview), [tools](https://mastra.ai/docs/agents/using-tools), [workflows](https://mastra.ai/docs/workflows/overview), [scorers](https://mastra.ai/docs/evals/overview), and [observability](https://mastra.ai/docs/observability/overview).

If you're new to AI agents, check out our [course](https://mastra.ai/course) and [YouTube videos](https://youtube.com/@mastra-ai). You can also join our [Discord](https://discord.gg/BTYqqHKUrf) community to get help and share your projects.

## Deploy on Mastra Cloud

[Mastra Cloud](https://cloud.mastra.ai/) gives you a serverless agent environment with atomic deployments. Access your agents from anywhere and monitor performance. Make sure they don't go off the rails with evals and tracing.

Check out the [deployment guide](https://mastra.ai/docs/deployment/overview) for more details.
