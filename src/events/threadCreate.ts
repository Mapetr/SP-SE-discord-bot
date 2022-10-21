import {EmbedBuilder, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};
import {convertChannelType} from "../lib/conversion.js";

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
    const sendChannel = thread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
