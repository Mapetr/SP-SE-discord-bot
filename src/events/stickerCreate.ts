import {EmbedBuilder, Sticker} from "discord.js";
import {convertStickerFormat} from "../lib/conversion.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'stickerCreate',
  once: false,
  async execute(sticker: Sticker) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidána nálepka")
      .setFields(
        {name: "Název", value: sticker.name},
        {name: "Popis", value: sticker.description ?? "N/A"},
        {name: "Formát", value: convertStickerFormat(sticker.format)},
      )
      .setURL(sticker.url)
      .setImage(sticker.url)
      .setFooter({ text: `ID: ${sticker.id}` })
      .setTimestamp();
    await sendLog(embed, sticker.client);
  }
}
