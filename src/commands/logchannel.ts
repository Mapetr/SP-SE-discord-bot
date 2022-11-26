import { ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ping",
  description: "Ping the Bot!",
  type: ApplicationCommandTypes.ChatInput,
  scope: "Global",
  execute: async (bot, interaction) => {

  },
});
