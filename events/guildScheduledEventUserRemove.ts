import {EmbedBuilder, GuildScheduledEvent, TextChannel, User} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'guildScheduledEventUserRemove',
  once: false,
  async execute(event: GuildScheduledEvent, user: User) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Uživatel se odstranil z eventu")
      .setFields(
        { name: 'Jméno', value: event.name },
        { name: 'Uživatel', value: user.tag },
      )
      .setImage(event.image)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    const sendChannel = event.guild?.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
