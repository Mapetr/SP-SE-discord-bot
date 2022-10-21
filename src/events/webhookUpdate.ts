import {EmbedBuilder, NewsChannel, TextChannel, VoiceChannel} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'webhookUpdate',
  once: false,
  async execute(channel: TextChannel | NewsChannel | VoiceChannel) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněn webhook")
      .setFields(
        { name: "Název", value: channel.name }
      )
      .setFooter({ text: `ID: ${channel.id}` })
      .setTimestamp();
    await sendLog(embed, channel.client);
  }
}
