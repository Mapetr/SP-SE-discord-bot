import {EmbedBuilder, GuildScheduledEvent, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'guildScheduledEventCreate',
  once: false,
  async execute(event: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidán event")
      .setFields(
        { name: 'Jméno', value: event.name },
        { name: 'Popis', value: event.description ?? "N/A" },
        { name: 'Vytvořen na', value: event.scheduledStartAt?.toLocaleString() ?? "N/A" },
        { name: 'Vytvořil', value: event.creator?.tag ?? "N/A" },
      )
      .setImage(event.image)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    const sendChannel = event.guild?.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
