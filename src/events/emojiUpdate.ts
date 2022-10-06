import {EmbedBuilder, GuildEmoji, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'emojiUpdate',
  once: false,
  async execute(oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Upraveno emoji")
      .addFields(
        { name: 'Název', value: newEmoji.name ?? "N/A" },
        { name: 'Autor', value: newEmoji.author?.username ?? "N/A", inline: true },
        { name: 'Animovaný', value: newEmoji.animated ? "Ano" : "Ne", inline: true },
      )
      .setImage(newEmoji.url)
      .setFooter({ text: `ID: ${newEmoji.id}` })
      .setTimestamp();
    const sendChannel = newEmoji.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
