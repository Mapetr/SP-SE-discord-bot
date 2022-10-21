import {EmbedBuilder, GuildScheduledEvent} from "discord.js";
import {sendLog} from "../lib/sending.js";

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
    await sendLog(embed, event.client);
  }
}
