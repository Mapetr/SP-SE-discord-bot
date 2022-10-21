import {EmbedBuilder, GuildChannel} from "discord.js";
import {convertChannelType} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'channelCreate',
  once: false,
  async execute(channel: GuildChannel) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Kanál vytvořen")
      .addFields({name: 'Název', value: channel.name})
      .addFields({name: 'Typ', value: convertChannelType(channel.type)})
      .setURL(channel.url)
      .setFooter({text: `Channel ID: ${channel.id}`})
      .setTimestamp();
    await sendLog(embed, channel.client);
  }
}
