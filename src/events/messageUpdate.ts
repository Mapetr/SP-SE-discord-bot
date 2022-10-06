import {EmbedBuilder, Message, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'messageUpdate',
  once: false,
  async execute(oldMessage: Message, newMessage: Message) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Zpráva upravena")
      .setFields(
        { name: 'Stará zpráva', value: oldMessage.content },
        { name: 'Nová zpráva', value: newMessage.content },
        { name: 'Autor', value: newMessage.author.tag },
      )
      .setFooter({ text: `ID: ${newMessage.author.id}` })
      .setTimestamp();
    const sendChannel = oldMessage.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
