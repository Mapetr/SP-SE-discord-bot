import {EmbedBuilder, GuildMember, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'threadMembersUpdate',
  once: false,
  async execute(addedMembers: GuildMember[], removedMembers: GuildMember[], thread: ThreadChannel) {
    let added = "";
    let removed = "";
    addedMembers.forEach(member => added += `<@${member.user.id}>, `);
    removedMembers.forEach(member => removed += `<@${member.user.id}>, `);
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Přidání/Odebrání uživatelé do vlákna")
      .setFooter({text: `ID: ${thread.id}`})
      .setURL(thread.url)
      .setTimestamp();
    // Added
    if (added !== "") {
      embed.addFields({name: "Přidáno", value: added});
    }
    // Removed
    if (removed !== "") {
      embed.addFields({name: "Odebráno", value: removed});
    }
    const sendChannel = thread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
