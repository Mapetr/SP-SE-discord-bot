import {Client} from "discord.js";
import {Commands} from "../Commands.js";
import {captureException} from "@sentry/node";

export default {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    if (!client.user || !client.application) return;
    await client.application.commands.set(Commands).catch(err => captureException(err));
  }
}
