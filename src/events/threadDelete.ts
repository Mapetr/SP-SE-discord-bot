import {EmbedBuilder, ThreadChannel} from "discord.js";
import {convertChannelType} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'threadDelete',
  once: false,
  async execute(thread: ThreadChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odstraněno vlákno")
      .setFields(
        {name: "Název", value: thread.name},
        {name: "Kanál", value: thread.parent?.name ?? "N/A"},
        {name: "Typ", value: convertChannelType(thread.type)}
      )
      .setFooter({ text: `ID: ${thread.id}` })
      .setTimestamp();
    await sendLog(embed, thread.client);
  }
}
