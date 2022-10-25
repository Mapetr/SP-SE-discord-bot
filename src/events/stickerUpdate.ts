import {EmbedBuilder, Sticker} from "discord.js";
import {convertStickerFormat} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

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
    await sendLog(embed, newSticker.client, newSticker.guildId ?? '');
  }
}
