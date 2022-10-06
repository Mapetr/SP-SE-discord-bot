import {Client, CommandInteraction, EmbedBuilder} from "discord.js";
import {Command} from "./Command";
import json from "../../package.json" assert {type: "json"};

export const Stats: Command = {
  name: "stats",
  description: "Get the bot's stats",
  run: async (client: Client, interaction: CommandInteraction) => {
    const apiLatency = Math.round(client.ws.ping);
    const embed = new EmbedBuilder()
      .setColor((apiLatency < 100) ? 0x00ff00 : (apiLatency < 200) ? 0xffff00 : 0xff0000)
      .setTitle("Statistika")
      .addFields(
        { name: "Lokální čas", value: new Date().toLocaleString('cs-CZ') },
        { name: "Discord API Latence", value: `${apiLatency}ms` },
        { name: "Verze", value: `v${json.version}` },
        { name: "Repozitář", value: "https://github.com/Mapetr/SPSSE-discord-bot"})
      .setTimestamp();
    await interaction.reply({embeds: [embed]});
  }
};
