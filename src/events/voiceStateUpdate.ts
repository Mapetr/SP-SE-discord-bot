import {VoiceState} from "discord.js";

export default{
  name: 'voiceStateUpdate',
  once: false,
  async execute(oldState: VoiceState, newState: VoiceState) {
    // TODO: Check for updated properties
    // TODO: Change embed based on updated properties
    /*const sendChannel = newSticker.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");*/
  }
}
