import {EmbedBuilder, GuildBan} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildBanRemove',
  once: false,
  async execute(ban: GuildBan) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Uživatel odbanován")
      .setFields(
        {name: 'Jméno', value: ban.user.tag},
        {name: 'ID', value: ban.user.id},
        {name: 'Důvod', value: ban.reason ?? 'N/A'},
      )
      .setImage(ban.user.avatarURL())
      .setFooter({ text: `ID: ${ban.user.id}` })
      .setTimestamp();
    await sendLog(embed, ban.client, ban.guild.id);
  }
}
