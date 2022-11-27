import { ApplicationCommandTypes, InteractionResponseTypes } from "../../deps.ts";
import { createCommand } from "./mod.ts";
import { database } from "../utils/appwrite.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "Event: LogChannel" });

createCommand({
  name: "logchannel",
  description: "Sets the channel for logging!",
  type: ApplicationCommandTypes.ChatInput,
  scope: "Guild",
  userPermissions: ["ADMINISTRATOR"],
  execute: async (bot, interaction) => {
    const channel = interaction.channelId;
    const guild = interaction.guildId;
    const databaseId = Deno.env.get("APPWRITE_DATABASE_ID");
    const collectionId = Deno.env.get("APPWRITE_SERVERS_ID");

    if (channel && guild && databaseId && collectionId) {
      await database.createDocument(databaseId, collectionId, guild.toString(), {
        channelId: channel.toString(),
      }).catch(log.error);
      return bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `Successfully set the log channel to <#${channel}>`,
          }
        }
      );
    } else {
      return bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: "You can only use this command in a server!",
          },
        });
    }
  },
});
