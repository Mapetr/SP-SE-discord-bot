import {EmbedBuilder, GuildScheduledEvent} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'guildScheduledEventCreate',
  once: false,
  async execute(event: GuildScheduledEvent) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidán event")
      .setFields(
        {name: 'Jméno', value: event.name},
        {name: 'Popis', value: event.description ?? "N/A"},
        {name: 'Začátek', value: event.scheduledStartAt ? `<t:${event.scheduledStartTimestamp}>` : "N/A", inline: true},
        {name: 'Vytvořil', value: event.creator?.tag ?? "N/A", inline: true},
      )
      .setImage(event.image)
      .setURL(event.url)
      .setFooter({ text: `ID: ${event.id}` })
      .setTimestamp();
    await sendLog(embed, event.client);
  }
}
