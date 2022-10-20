import {EmbedBuilder, Message, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage: Message, newMessage: Message) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Zpráva upravena")
      .setFooter({text: `ID: ${newMessage.author.id}`})
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
    const sendChannel = oldMessage.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
