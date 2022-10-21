import {EmbedBuilder, StageInstance} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'stageInstanceUpdate',
  once: false,
  async execute(oldStage: StageInstance, newStage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Odebrán stage kanál")
      .setFooter({text: `ID: ${newStage.id}`})
      .setTimestamp();
    // Topic
    if (oldStage.topic !== newStage.topic) {
      embed.addFields({ name: 'Téma', value: `${oldStage.topic} -> ${newStage.topic}` });
    }
    // Privacy level
    if (oldStage.privacyLevel !== newStage.privacyLevel) {
      embed.addFields({ name: 'Level soukromí', value: `${oldStage.privacyLevel} -> ${newStage.privacyLevel}` });
    }
    await sendLog(embed, newStage.client);
  }
}
