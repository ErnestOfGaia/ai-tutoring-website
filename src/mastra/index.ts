
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { DuckDBStore } from "@mastra/duckdb";
import { MastraCompositeStore } from '@mastra/core/storage';
import { Observability, DefaultExporter, CloudExporter, SensitiveDataFilter } from '@mastra/observability';
import { marketerAgent, secretaryAgent, recruiterAgent, routingAgent, surfAgent } from './agents/index.js';

console.error('[mastra] before duckdb');
const observabilityStore = await new DuckDBStore().getStore('observability');
console.error('[mastra] after duckdb');

export const mastra = new Mastra({
  agents: { routingAgent, marketerAgent, secretaryAgent, recruiterAgent, surfAgent },
  storage: new MastraCompositeStore({
    id: 'composite-storage',
    default: new LibSQLStore({
      id: "mastra-storage",
      url: "file:./data/mastra.db",
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
