import {EmbedBuilder, GuildChannel, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'channelUpdate',
  once: false,
  async execute(oldChannel: GuildChannel, newChannel: GuildChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Kanál upraven")
      .addFields(
        {name: 'Název kanálu', value: newChannel.name, inline: true},
      )
      .setFooter({ text: `ID: ${newChannel.id}` })
      .setTimestamp();
    const sendChannel = oldChannel.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
