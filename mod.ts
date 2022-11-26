import {
  ActivityTypes,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  fastFileLoader,
  GatewayIntents,
  startBot,
} from "./deps.ts";
import * as sdk from "https://deno.land/x/appwrite/mod.ts";
import { logger } from "./src/utils/logger.ts";
import { events } from "./src/events/mod.ts";
import { updateCommands } from "./src/utils/helpers.ts";

const log = logger({ name: "Main" });

log.info("Starting Bot, this might take a while...");

const paths = ["./src/events", "./src/commands"];
await fastFileLoader(paths).catch((err) => {
  log.fatal(`Unable to Import ${paths}`);
  log.fatal(err);
  Deno.exit(1);
});

export const bot = enableCachePlugin(
  createBot({
    token: Deno.env.get("TOKEN"),
    botId: Deno.env.get("BOT_ID"),
    intents: GatewayIntents.Guilds,
    events,
  }),
);

export const appwrite = new sdk.Client()
  .setEndpoint(Deno.env.get("APPWRITE_ENDPOINT"))
  .setProject(Deno.env.get("APPWRITE_PROJECT_ID"))
  .setKey(Deno.env.get("APPWRITE_API_KEY"));

// @ts-nocheck: no-updated-depencdencies
enableCacheSweepers(bot);

bot.gateway.manager.createShardOptions.makePresence = (shardId: number) => {
  return {
    shardId: shardId,
    status: "online",
    activities: [
      {
        name: "kostik je kokot",
        type: ActivityTypes.Watching,
        createdAt: Date.now(),
      },
    ],
  };
};

await startBot(bot);

await updateCommands(bot);
