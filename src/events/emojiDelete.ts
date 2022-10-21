import {EmbedBuilder, GuildEmoji} from "discord.js";
import {sendLog} from "../lib/sending.js";

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
    await sendLog(embed, emoji.client);
  }
}
