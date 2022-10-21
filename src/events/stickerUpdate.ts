import {EmbedBuilder, Sticker, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};
import {convertStickerFormat} from "../lib/conversion.js";

export default {
  name: 'stickerUpdate',
  once: false,
  async execute(oldSticker: Sticker, newSticker: Sticker) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněna nálepka")
      .setURL(newSticker.url)
      .setImage(newSticker.url)
      .setFooter({text: `ID: ${newSticker.id}`})
      .setTimestamp();
    // Name
    if (oldSticker.name !== newSticker.name) {
      embed.addFields({name: "Název", value: `${oldSticker.name} -> ${newSticker.name}`});
    }
    // Description
    if (oldSticker.description !== newSticker.description) {
      embed.addFields({name: "Popis", value: `${oldSticker.description} -> ${newSticker.description}`});
    }
    // Format
    if (oldSticker.format !== newSticker.format) {
      embed.addFields({
        name: "Formát",
        value: `${convertStickerFormat(oldSticker.format)} -> ${convertStickerFormat(newSticker.format)}`
      });
    }
    // Tags
    if (oldSticker.tags !== newSticker.tags) {
      embed.addFields({name: "Tagy", value: `${oldSticker.tags} -> ${newSticker.tags}`});
    }
    const sendChannel = newSticker.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
