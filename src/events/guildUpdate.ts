import {EmbedBuilder, Guild, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};
import {convertExplicitContentFilterLevel, convertGuildFeatures} from "../lib/conversion.js";

export default {
  name: 'guildUpdate',
  once: false,
  async execute(oldGuild: Guild, newGuild: Guild) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Server se změnil")
      .setImage(newGuild.iconURL())
      .setFooter({text: `ID: ${newGuild.id}`})
      .setTimestamp();
    // Name
    if (oldGuild.name !== newGuild.name) {
      embed.addFields({name: 'Jméno', value: `${oldGuild.name} -> ${newGuild.name}`});
    }
    // Description
    if (oldGuild.description !== newGuild.description) {
      embed.addFields({name: 'Popis', value: `${oldGuild.description} -> ${newGuild.description}`});
    }
    // AFK Channel
    if (oldGuild.afkChannelId !== newGuild.afkChannelId) {
      embed.addFields({name: 'AFK kanál', value: `${oldGuild.afkChannelId} -> ${newGuild.afkChannelId}`});
    }
    // AFK Timeout
    if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
      embed.addFields({name: 'AFK Timeout', value: `${oldGuild.afkTimeout} -> ${newGuild.afkTimeout}`});
    }
    // Description
    if (oldGuild.description !== newGuild.description) {
      embed.addFields({name: 'Popis', value: `${oldGuild.description} -> ${newGuild.description}`});
    }
    // Explicit Content Filter
    if (oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) {
      embed.addFields({
        name: 'Explicitní obsah',
        value: `${convertExplicitContentFilterLevel(oldGuild.explicitContentFilter)} -> ${convertExplicitContentFilterLevel(newGuild.explicitContentFilter)}`
      });
    }
    // Features
    if (oldGuild.features.length !== newGuild.features.length) {
      embed.addFields({name: 'Nové features', value: `${convertGuildFeatures(newGuild.features)}`});
    }
    // Maximum bitrate
    if (oldGuild.maximumBitrate !== newGuild.maximumBitrate) {
      embed.addFields({name: 'Maximální bitrate', value: `${oldGuild.maximumBitrate} -> ${newGuild.maximumBitrate}`});
    }
    // Maximum members
    if (oldGuild.maximumMembers !== newGuild.maximumMembers) {
      embed.addFields({
        name: 'Maximální počet členů',
        value: `${oldGuild.maximumMembers} -> ${newGuild.maximumMembers}`
      });
    }
    // Maximum presences
    if (oldGuild.maximumPresences !== newGuild.maximumPresences) {
      embed.addFields({
        name: 'Maximální počet přítomností',
        value: `${oldGuild.maximumPresences} -> ${newGuild.maximumPresences}`
      });
    }
    // Maximum video channel users
    if (oldGuild.maxVideoChannelUsers !== newGuild.maxVideoChannelUsers) {
      embed.addFields({
        name: 'Maximální počet uživatelů v video kanálu',
        value: `${oldGuild.maxVideoChannelUsers} -> ${newGuild.maxVideoChannelUsers}`
      });
    }
    // Member count
    if (oldGuild.memberCount !== newGuild.memberCount) {
      embed.addFields({name: 'Počet členů', value: `${oldGuild.memberCount} -> ${newGuild.memberCount}`});
    }

    const sendChannel = oldGuild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
