import {EmbedBuilder, GuildEmoji, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

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
    const sendChannel = newEmoji.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
