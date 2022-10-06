import {EmbedBuilder, GuildMember, TextChannel, ThreadChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'threadMembersUpdate',
  once: false,
  async execute(addedMembers: GuildMember[], removedMembers: GuildMember[], thread: ThreadChannel) {
    const add = addedMembers.toString();
    const rem = removedMembers.toString();
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Přidání/Odebrání uživatelé do vlákna")
      .setFields(
        { name: "Název", value: thread.name },
        { name: "Přidaný", value: add ?? "Žádní" },
        { name: "Odstranění", value: rem ?? "Žádní" },
      )
      .setFooter({ text: `ID: ${thread.id}` })
      .setTimestamp();
    const sendChannel = thread.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
