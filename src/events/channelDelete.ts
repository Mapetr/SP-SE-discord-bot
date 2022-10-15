import {EmbedBuilder, GuildChannel, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};
import {convertChannelType} from "../lib/types.js";

export default {
  name: 'channelDelete',
  once: false,
  async execute(channel: GuildChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Kanál odstraněn")
      .addFields({name: 'Název', value: channel.name})
      .addFields({name: 'Typ', value: convertChannelType(channel.type)})
      .setFooter({ text: `ID: ${channel.id}` })
      .setTimestamp();
    const sendChannel = channel.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
