import {EmbedBuilder, Role} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'roleDelete',
  once: false,
  async execute(role: Role) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Role odstraněna")
      .setFields(
        {name: 'Jméno', value: role.name}
      )
      .setFooter({ text: `ID: ${role.id}` })
      .setTimestamp();
    await sendLog(embed, role.client);
  }
}
