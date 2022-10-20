import {EmbedBuilder, GuildMember, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildMemberUpdate',
  once: false,
  async execute(oldMember: GuildMember, newMember: GuildMember) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Uživatel se změnil")
      .setImage(newMember.avatarURL())
      .setFooter({text: `ID: ${newMember.id}`})
      .setTimestamp();
    // Avatar
    if (oldMember.user.avatarURL() !== newMember.user.avatarURL()) {
      embed.addFields({name: 'Avatar', value: `${oldMember.user.avatarURL()} -> ${newMember.user.avatarURL()}`});
    }
    // Display name
    if (oldMember.displayName !== newMember.displayName) {
      embed.addFields({name: 'Zobrazované jméno', value: `${oldMember.displayName} -> ${newMember.displayName}`});
    }
    // Nickname
    if (oldMember.nickname !== newMember.nickname) {
      embed.addFields({name: 'Přezdívka', value: `${oldMember.nickname} -> ${newMember.nickname}`});
    }
    // Display Hex Color
    if (oldMember.displayHexColor !== newMember.displayHexColor) {
      embed.addFields({name: 'Barva', value: `${oldMember.displayHexColor} -> ${newMember.displayHexColor}`});
    }
    // Roles
    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
      const roles = newMember.roles.cache.map(role => role.name);
      embed.addFields({name: 'Role', value: roles.join(', ')});
    }
    // Presence
    if (oldMember.presence?.status !== newMember.presence?.status) {
      embed.addFields({name: 'Stav', value: `${oldMember.presence?.status} -> ${newMember.presence?.status}`});
    }
    const sendChannel = oldMember.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
