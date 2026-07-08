
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { DuckDBStore } from "@mastra/duckdb";
import { MastraCompositeStore } from '@mastra/core/storage';
import { Observability, DefaultExporter, CloudExporter, SensitiveDataFilter } from '@mastra/observability';
import { marketerAgent, secretaryAgent, recruiterAgent, routingAgent, surfAgent } from './agents/index.js';
import { ochiBookingRoute } from './routes/ochiBookingRoute.js';

console.error('[mastra] before duckdb');
const observabilityStore = await new DuckDBStore().getStore('observability');
console.error('[mastra] after duckdb');

export const mastra = new Mastra({
  agents: { routingAgent, marketerAgent, secretaryAgent, recruiterAgent, surfAgent },
  // Custom HTTP routes alongside the built-in agent API. /ochi-booking is the
  // deterministic lead intake for the OCHI funnel (see routes/ochiBookingRoute).
  server: {
    apiRoutes: [ochiBookingRoute],
  },
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: "mastra-storage",
      // Prod (Docker) uses the default relative path against the /app workdir.
      // Local dev: set MASTRA_DB_URL=file:<absolute-path> in .env — `mastra dev`
      // bundles into `.mastra/output/` and runs with that as cwd, so a relative
      // path resolves to a wiped-on-rebuild directory and fails with CANTOPEN.
      url: process.env.MASTRA_DB_URL ?? "file:./data/mastra.db",
    }),
    domains: {
      observability: observabilityStore,
    }
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra',
        exporters: [
          new DefaultExporter(),
          new CloudExporter(),
        ],
        spanOutputProcessors: [
          new SensitiveDataFilter(),
        ],
      },
    },
  }),
});

console.error('[mastra] after Mastra ctor');
