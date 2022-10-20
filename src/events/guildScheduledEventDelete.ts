import {EmbedBuilder, GuildScheduledEvent, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildScheduledEventDelete',
  once: false,
  async execute(event: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odstraněn event")
      .setFields(
        {name: 'Jméno', value: event.name},
        {name: 'Popis', value: event.description ?? "N/A"},
        {name: 'Vytvořil', value: event.creator?.tag ?? "N/A"},
      )
      .setImage(event.image)
      .setURL(event.url)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    const sendChannel = event.guild?.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
