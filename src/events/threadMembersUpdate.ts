import {EmbedBuilder, GuildMember, ThreadChannel} from "discord.js";
import {sendLog} from "../lib/sending.js";

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
    await sendLog(embed, thread.client, thread.guildId);
  }
}
