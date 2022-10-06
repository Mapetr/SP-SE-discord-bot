import {EmbedBuilder, Role, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'roleUpdate',
  once: false,
  async execute(role: Role) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Role upravena")
      .setFields(
        { name: 'Jméno', value: role.name }
      )
      .setFooter({ text: `ID: ${role.id}` })
      .setTimestamp();
    const sendChannel = role.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
