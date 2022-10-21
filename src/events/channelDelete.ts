import {EmbedBuilder, GuildChannel} from "discord.js";
import {convertChannelType} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'channelDelete',
  once: false,
  async execute(channel: GuildChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Kanál odstraněn")
      .addFields({name: 'Název', value: channel.name})
      .addFields({name: 'Typ', value: convertChannelType(channel.type)})
      .setURL(channel.url)
      .setFooter({ text: `ID: ${channel.id}` })
      .setTimestamp();
    await sendLog(embed, channel.client);
  }
}
