import {EmbedBuilder, StageInstance, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'stageInstanceUpdate',
  once: false,
  async execute(oldStage: StageInstance, newStage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Odebrán stage kanál")
      .setFields(
        { name: 'Téma', value: newStage.topic }
      )
      .setFooter({ text: `ID: ${newStage.id}` })
      .setTimestamp();
    const sendChannel = newStage.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
