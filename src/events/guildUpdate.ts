import {EmbedBuilder, Guild, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildUpdate',
  once: false,
  async execute(oldGuild: Guild, newGuild: Guild) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Server se změnil")
      .setFields(
        { name: 'Jméno', value: newGuild.name },
      )
      .setImage(newGuild.iconURL())
      .setFooter({ text: `ID: ${newGuild.id}` })
      .setTimestamp();
    const sendChannel = oldGuild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
