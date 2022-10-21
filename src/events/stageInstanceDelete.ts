import {EmbedBuilder, StageInstance} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'stageInstanceDelete',
  once: false,
  async execute(stage: StageInstance) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odebrán stage kanál")
      .setFields(
        {name: 'Téma', value: stage.topic}
      )
      .setFooter({ text: `ID: ${stage.id}` })
      .setTimestamp();
    await sendLog(embed, stage.client);
  }
}
