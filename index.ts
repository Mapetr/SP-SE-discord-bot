import {Client} from "discord.js";
import * as Sentry from "@sentry/node";
import "@sentry/tracing"
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";

// Setup for Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'dev',
  environment: process.env.NODE_ENV,
});

// Discord.js Client
const client = new Client({ intents: 34511 });

// Load all events
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Attach events to client
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  import(filePath).then((event) => {
    event = event.default
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => {
        const transaction = Sentry.startTransaction({
          op: "event",
          name: event.name,
        });
        try {
          event.execute(...args);
        } catch (e) {
          console.error(e);
          Sentry.captureException(e);
        }
        transaction.finish();
      });
    }
    if (process.env.NODE_ENV === "dev") console.log(`Loaded event ${event.name}`);
  }).catch((e) => {
    console.error(e);
    Sentry.captureException(e);
  });
}

// Login to Discord
client.login(process.env.TOKEN)
  .catch(err => {
    console.error(err);
    Sentry.captureException(err);
  });
