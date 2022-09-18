import {EmbedBuilder, GuildScheduledEvent, TextChannel} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'guildScheduledEventDelete',
  once: false,
  async execute(event: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odstraněn event")
      .setFields(
        { name: 'Jméno', value: event.name },
        { name: 'Popis', value: event.description ? event.description : "N/A" },
        { name: 'Vytvořen na', value: event.scheduledStartAt ? event.scheduledStartAt.toLocaleString() : "N/A" },
        { name: 'Vytvořil', value: event.creator ? event.creator.tag : "N/A" },
      )
      .setImage(event.image)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    const sendChannel = event.guild?.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
