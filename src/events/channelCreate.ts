import { Bot, Channel, transformEmbed } from "../../deps.ts";
import { events } from "./mod.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "Event: ChannelCreate" });

events.channelCreate = (bot: Bot, channel: Channel) => {
  const embed = transformEmbed(bot, {
    title: "Channel Created",
    description: `Channel <#${channel.id}> was created.`,
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
  bot.helpers.createMessage(channel.guildId, {
    embeds: [embed]
  });
};
