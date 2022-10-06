import {EmbedBuilder, Message, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'messageDelete',
  once: false,
  async execute(message: Message) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Zpráva odstraněna")
      .setFields(
        { name: 'Zpráva', value: message.content },
        { name: 'Autor', value: message.author.tag },
      )
      .setFooter({ text: `ID: ${message.author.id}` })
      .setTimestamp();
    const sendChannel = message.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
