import {EmbedBuilder, StageInstance} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'stageInstanceCreate',
  once: false,
  async execute(stage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidán stage kanál")
      .setFields(
        {name: 'Téma', value: stage.topic}
      )
      .setFooter({ text: `ID: ${stage.id}` })
      .setTimestamp();
    await sendLog(embed, stage.client, stage.guildId);
  }
}
