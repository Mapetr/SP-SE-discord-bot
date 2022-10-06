import {EmbedBuilder, GuildBan, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildBanRemove',
  once: false,
  async execute(ban: GuildBan) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Uživatel odbanován")
      .setFields(
        { name: 'Jméno', value: ban.user.tag },
        { name: 'ID', value: ban.user.id },
        { name: 'Důvod', value: ban.reason ?? 'N/A' },
      )
      .setImage(ban.user.avatarURL())
      .setFooter({ text: `ID: ${ban.user.id}` })
      .setTimestamp();
    const sendChannel = ban.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
