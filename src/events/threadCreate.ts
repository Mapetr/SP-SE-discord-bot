import {EmbedBuilder, ThreadChannel} from "discord.js";
import {convertChannelType} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'threadCreate',
  once: false,
  async execute(thread: ThreadChannel, newlyCreated: boolean) {
    if (!newlyCreated) return;
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Vytvořeno vlákno")
      .setFields(
        {name: "Název", value: thread.name},
        {name: "Kanál", value: thread.parent?.name ?? "N/A"},
        {name: "Typ", value: convertChannelType(thread.type)}
      )
      .setFooter({text: `ID: ${thread.id}`})
      .setURL(thread.url)
      .setTimestamp();
    await sendLog(embed, thread.client);
  }
}
