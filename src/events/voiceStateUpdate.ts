import {EmbedBuilder, VoiceState} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'voiceStateUpdate',
  once: false,
  async execute(oldState: VoiceState, newState: VoiceState) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněn stav hlasového kanálu")
      .setImage(newState.member?.avatarURL() ?? null)
      .setFooter({text: `ID: ${newState.member?.id}`})
      .setTimestamp();
    // Join
    if (!oldState.channelId) {
      embed.setTitle("Uživatel se připojil do hlasového kanálu");
    }
    // Leave
    if (!newState.channelId) {
      embed.setTitle("Uživatel se odpojil z hlasového kanálu");
    }
    // Channel
    if (oldState.channelId !== newState.channelId) {
      embed.addFields({name: 'Kanál', value: `${oldState.channel?.name} -> ${newState.channel?.name}`});
    }
    // selfDeaf
    if (oldState.selfDeaf !== newState.selfDeaf) {
      embed.addFields({name: 'Ztlumení zvuku', value: `${oldState.selfDeaf} -> ${newState.selfDeaf}`});
    }
    // selfMute
    if (oldState.selfMute !== newState.selfMute) {
      embed.addFields({name: 'Ztlumení mikrofonu', value: `${oldState.selfMute} -> ${newState.selfMute}`});
    }
    // selfVideo
    if (oldState.selfVideo !== newState.selfVideo) {
      embed.addFields({name: 'Video', value: `${oldState.selfVideo} -> ${newState.selfVideo}`});
    }
    // serverDeaf
    if (oldState.serverDeaf !== newState.serverDeaf) {
      embed.addFields({name: 'Server ztlumení zvuku', value: `${oldState.serverDeaf} -> ${newState.serverDeaf}`});
    }
    // serverMute
    if (oldState.serverMute !== newState.serverMute) {
      embed.addFields({name: 'Server ztlumení mikrofonu', value: `${oldState.serverMute} -> ${newState.serverMute}`});
    }
    // Streaming
    if (oldState.streaming !== newState.streaming) {
      embed.addFields({name: 'Streaming', value: `${oldState.streaming} -> ${newState.streaming}`});
    }
    await sendLog(embed, newState.client);
  }
}
