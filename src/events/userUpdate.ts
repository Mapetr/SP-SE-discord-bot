import {EmbedBuilder, TextChannel, User} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'userUpdate',
  once: false,
  async execute(oldUser: User, newUser: User) {
    const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Změněna nálepka")
      .setFields(
        { name: "Název", value: newUser.username }
      )
      .setFooter({ text: `ID: ${newUser.id}` })
      .setTimestamp();
    const sendChannel = newUser.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}

// TODO: Check for updated properties
