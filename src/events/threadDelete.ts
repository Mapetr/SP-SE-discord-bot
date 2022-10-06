import {EmbedBuilder, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'threadDelete',
  once: false,
  async execute(thread: ThreadChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odstraněno vlákno")
      .setFields(
        { name: "Název", value: thread.name }
      )
      .setFooter({ text: `ID: ${thread.id}` })
      .setTimestamp();
    const sendChannel = thread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
