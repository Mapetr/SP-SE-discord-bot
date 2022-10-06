import {EmbedBuilder, Sticker, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'stickerCreate',
  once: false,
  async execute(sticker: Sticker) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidána nálepka")
      .setFields(
        { name: "Název", value: sticker.name }
      )
      .setFooter({ text: `ID: ${sticker.id}` })
      .setTimestamp();
    const sendChannel = sticker.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
