import {Client, CommandInteraction} from "discord.js";
import {Command} from "./Command.js";
import {ApplicationCommandOptionType} from "discord-api-types/v10";
import {Quotes} from "../lib/models.js";

export const Citat: Command = {
  name: "citat",
  description: "Vyhledává citáty",
  options: [
    {
      name: "teacher",
      description: "Učitel",
      type: ApplicationCommandOptionType.String,
      required: true,
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const teacher = interaction.options.get("teacher")?.value as string;
    const res = await Quotes.find({teacher: teacher}).exec();
    if (res.length === 0) {
      await interaction.reply({content: "Nebyl nalezen žádný citát"});
      return;
    }
    const quote = res[Math.floor(Math.random() * res.length)];
    await interaction.reply({content: `> ${quote.quote}\n- ${quote.teacher} ${new Date(quote.time).getFullYear()}`});
  }
};
