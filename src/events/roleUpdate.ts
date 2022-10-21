import {EmbedBuilder, Role, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'roleUpdate',
  once: false,
  async execute(oldRole: Role, newRole: Role) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Role upravena")
      .setFooter({ text: `ID: ${newRole.id}` })
      .setTimestamp();
    // Name
    if (oldRole.name !== newRole.name) {
      embed.addFields({name: 'Jméno', value: `${oldRole.name} -> ${newRole.name}`});
    }
    // hexColor
    if (oldRole.hexColor !== newRole.hexColor) {
      embed.addFields({name: 'Barva', value: `${oldRole.hexColor} -> ${newRole.hexColor}`});
    }
    // Position
    if (oldRole.position !== newRole.position) {
      embed.addFields({name: 'Pozice', value: `${oldRole.position} -> ${newRole.position}`});
    }
    // Permissions
    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
      embed.addFields({name: 'Oprávnění', value: `${oldRole.permissions.bitfield} -> ${newRole.permissions.bitfield}`}); // TODO: Convert to human readable form
    }
    // Unicode emoji
    if (oldRole.unicodeEmoji !== newRole.unicodeEmoji) {
      embed.addFields({name: 'Unicode emoji', value: `${oldRole.unicodeEmoji} -> ${newRole.unicodeEmoji}`});
    }
    const sendChannel = newRole.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
