import {EmbedBuilder, GuildEmoji, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'emojiDelete',
  once: false,
  async execute(emoji: GuildEmoji) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odstraněno emoji")
      .addFields(
        {name: 'Název', value: emoji.name ?? "N/A"},
        {name: 'Autor', value: emoji.author?.username ?? "N/A", inline: true},
        {name: 'Animovaný', value: emoji.animated ? "Ano" : "Ne", inline: true},
      )
      .setURL(emoji.url)
      .setImage(emoji.url)
      .setFooter({ text: `ID: ${emoji.id}` })
      .setTimestamp();
    const sendChannel = emoji.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
