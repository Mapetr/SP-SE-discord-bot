import {EmbedBuilder, GuildMember, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildMemberUpdate',
  once: false,
  async execute(oldMember: GuildMember, newMember: GuildMember) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Uživatel se změnil")
      .setFields(
        { name: 'Jméno', value: newMember.user.tag },
        { name: 'ID', value: newMember.user.id },
      )
      .setImage(newMember.avatarURL())
      .setFooter({ text: `ID: ${newMember.id}` })
      .setTimestamp();
    const sendChannel = oldMember.guild.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
