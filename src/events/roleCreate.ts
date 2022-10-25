import {EmbedBuilder, Role} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'roleCreate',
  once: false,
  async execute(role: Role) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Role přidána")
      .setFields(
        {name: 'Jméno', value: role.name},
        {name: 'Barva', value: role.hexColor},
        {name: 'Pozice', value: role.position.toString()},
      )
      .setImage(role.iconURL())
      .setFooter({ text: `ID: ${role.id}` })
      .setTimestamp();
    await sendLog(embed, role.client, role.guild.id);
  }
}
