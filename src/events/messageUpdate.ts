import {EmbedBuilder, Message} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage: Message, newMessage: Message) {
    if (newMessage.author.bot) return;
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Zpráva upravena")
      .setFooter({text: `ID: ${newMessage.author.id}`})
      .setURL(newMessage.url)
      .setTimestamp();
    // Content
    if (oldMessage.content !== newMessage.content) {
      embed.addFields({name: 'Zpráva', value: `${oldMessage.content} -> ${newMessage.content}`});
    }
    // Embeds
    if (oldMessage.embeds.length !== newMessage.embeds.length) {
      embed.addFields({name: 'Embedy', value: `${oldMessage.embeds.length} -> ${newMessage.embeds.length}`});
    }
    // Pinned
    if (oldMessage.pinned !== newMessage.pinned) {
      embed.addFields({name: 'Pinned', value: `${oldMessage.pinned} -> ${newMessage.pinned}`});
    }
    // Author
    embed.addFields({name: "Autor", value: newMessage.author.tag});
    await sendLog(embed, newMessage.client);
  }
}
