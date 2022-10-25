import {EmbedBuilder, ThreadChannel} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'threadUpdate',
  once: false,
  async execute(oldThread: ThreadChannel, newThread: ThreadChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněno vlákno")
      .setFooter({text: `ID: ${newThread.id}`})
      .setURL(newThread.url)
      .setTimestamp();
    // Name
    if (oldThread.name !== newThread.name) {
      embed.addFields({name: "Název", value: `${oldThread.name} -> ${newThread.name}`});
    }
    // Archived
    if (oldThread.archived !== newThread.archived) {
      embed.addFields({name: "Archivováno", value: newThread.archived ? "Ano" : "Ne"});
    }
    // Locked
    if (oldThread.locked !== newThread.locked) {
      embed.addFields({name: "Zamčeno", value: newThread.locked ? "Ano" : "Ne"});
    }
    // Type
    if (oldThread.type !== newThread.type) {
      embed.addFields({name: "Typ", value: `${oldThread.type} -> ${newThread.type}`});
    }
    await sendLog(embed, newThread.client, newThread.guildId);
  }
}
