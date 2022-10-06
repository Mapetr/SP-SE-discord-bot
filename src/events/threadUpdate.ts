import {EmbedBuilder, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'threadUpdate',
  once: false,
  async execute(oldThread: ThreadChannel, newThread: ThreadChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněno vlákno")
      .setFields(
        { name: "Název", value: newThread.name }
      )
      .setFooter({ text: `ID: ${newThread.id}` })
      .setTimestamp();
    const sendChannel = newThread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
