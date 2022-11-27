import { ApplicationCommandTypes, InteractionResponseTypes, Bot, Interaction } from "../../deps.ts";
import { humanizeMilliseconds, snowflakeToTimestamp } from "../utils/helpers.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ping",
  description: "Ping the Bot!",
  type: ApplicationCommandTypes.ChatInput,
  scope: "Global",
  execute: async (bot: Bot, interaction: Interaction) => {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `🏓 Pong! Ping ${ping}ms (${humanizeMilliseconds(ping)})`,
        },
      },
    );
  },
});
