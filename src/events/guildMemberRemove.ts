import {EmbedBuilder, GuildMember, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildMemberRemove',
  once: false,
  async execute(member: GuildMember) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Uživatel se odpojil")
      .setFields(
        { name: 'Jméno', value: member.user.tag },
        { name: 'ID', value: member.user.id },
      )
      .setImage(member.avatarURL())
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();
    const sendChannel = member.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
