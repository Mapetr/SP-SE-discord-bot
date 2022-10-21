import {EmbedBuilder, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

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
    const sendChannel = newThread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
