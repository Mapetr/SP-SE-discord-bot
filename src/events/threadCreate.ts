import {EmbedBuilder, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'threadCreate',
  once: false,
  async execute(thread: ThreadChannel, newlyCreated: boolean) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Vytvořeno vlákno")
      .setFields(
        { name: "Název", value: thread.name },
        { name: "Kanál", value: thread.parent?.name ?? "Žádná" },
      )
      .setFooter({ text: `ID: ${thread.id}` })
      .setTimestamp();
    const sendChannel = thread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
