import {EmbedBuilder, GuildMember} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildMemberRemove',
  once: false,
  async execute(member: GuildMember) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Uživatel se odpojil")
      .setFields(
        {name: 'Jméno', value: member.user.tag},
        {name: 'ID', value: member.user.id},
      )
      .setImage(member.avatarURL())
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();
    await sendLog(embed, member.client, member.guild.id);
  }
}
