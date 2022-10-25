import {EmbedBuilder, Sticker} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'stickerDelete',
  once: false,
  async execute(sticker: Sticker) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odebrána nálepka")
      .setFields(
        {name: "Název", value: sticker.name}
      )
      .setFooter({ text: `ID: ${sticker.id}` })
      .setTimestamp();
    await sendLog(embed, sticker.client, sticker.guildId ?? '');
  }
}
