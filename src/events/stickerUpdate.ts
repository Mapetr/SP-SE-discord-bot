import {EmbedBuilder, Sticker, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'stickerUpdate',
  once: false,
  async execute(oldSticker: Sticker, newSticker: Sticker) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněna nálepka")
      .setFields(
        { name: "Název", value: newSticker.name }
      )
      .setFooter({ text: `ID: ${newSticker.id}` })
      .setTimestamp();
    const sendChannel = newSticker.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
