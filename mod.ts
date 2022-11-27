import {
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  enablePermissionsPlugin,
  fastFileLoader,
  GatewayIntents,
  startBot,
} from "./deps.ts";
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

export const bot = enableCachePlugin(createBot({
  token: Deno.env.get("TOKEN") ?? "",
  botId: BigInt(Deno.env.get("BOT_ID") ?? ""),
  intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
  events,
}));

enableCacheSweepers(bot);
enablePermissionsPlugin(bot);

await startBot(bot);

await updateCommands(bot).catch((err) => {
  log.fatal("Unable to Update Commands");
  log.fatal(err);
  Deno.exit(1);
});
