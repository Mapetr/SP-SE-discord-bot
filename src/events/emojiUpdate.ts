import {EmbedBuilder, GuildEmoji} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'emojiUpdate',
  once: false,
  async execute(oldEmoji: GuildEmoji, newEmoji: GuildEmoji) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Upraveno emoji")
      .setURL(newEmoji.url)
      .setImage(newEmoji.url)
      .setFooter({text: `ID: ${newEmoji.id}`})
      .setTimestamp();
    // Available
    if (oldEmoji.available !== newEmoji.available) {
      embed.addFields({name: 'Dostupné', value: `${oldEmoji.available} -> ${newEmoji.available}`});
    }
    // Name
    if (oldEmoji.name !== newEmoji.name) {
      embed.addFields({name: 'Název', value: `${oldEmoji.name} -> ${newEmoji.name}`});
    }
    // Roles
    if (oldEmoji.roles.cache.size !== newEmoji.roles.cache.size) {
      embed.addFields({name: 'Role', value: `${oldEmoji.roles.cache.size} -> ${newEmoji.roles.cache.size}`});
    }
    await sendLog(embed, newEmoji.client, newEmoji.guild.id);
  }
}
