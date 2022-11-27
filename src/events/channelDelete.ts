import { Bot, Channel, transformEmbed } from "../../deps.ts";
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";
import { database } from "../utils/appwrite.ts"

const log = logger({ name: "Event: ChannelCreate" });

events.channelDelete = (bot: Bot, channel: Channel) => {
  const embed = transformEmbed(bot, {
    title: "Channel removed",
    description: `Channel <#${channel.id}>(${channel.name}) was removed.`,
    color: 0x00ff00,
    url: `https://discord.com/channels/${channel.guildId}/${channel.id}`,
    fields: [
      {
        name: "Type",
        value: channel.type.toString(),
      }
    ],
    timestamp: new Date().toISOString(),
  });
  const channel = await database.getDocument(Deno.env.get("APPWRITE_DATABASE_ID"), Deno.env.get("APPWRITE_SERVERS_ID"), channel.guildId);
  console.log(channel);
  bot.helpers.createMessage(channel, {
    embeds: [embed]
  });
};
