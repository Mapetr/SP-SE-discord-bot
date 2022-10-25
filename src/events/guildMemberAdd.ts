import {EmbedBuilder, GuildMember} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildMemberAdd',
  once: false,
  async execute(member: GuildMember) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Uživatel se připojil")
      .setFields(
        {name: 'Jméno', value: member.user.tag},
        {name: 'ID', value: member.user.id},
        {name: 'Účet vytvořen', value: member.user.createdAt.toLocaleString()}
      )
      .setImage(member.avatarURL())
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();
    await sendLog(embed, member.client, member.guild.id);
  }
}
