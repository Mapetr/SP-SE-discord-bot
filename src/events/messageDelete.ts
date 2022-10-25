import {EmbedBuilder, Message} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'messageDelete',
  once: false,
  async execute(message: Message) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Zpráva odstraněna")
      .setFields(
        {name: 'Zpráva', value: message.content},
        {name: 'Autor', value: message.author.tag},
      )
      .setFooter({ text: `ID: ${message.author.id}` })
      .setTimestamp();
    await sendLog(embed, message.client, message.guildId ?? '');
  }
}
