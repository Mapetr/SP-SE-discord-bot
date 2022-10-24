import {Client, CommandInteraction} from "discord.js";
import {Command} from "./Command.js";
import {ApplicationCommandOptionType} from "discord-api-types/v10";
import {Quotes} from "../lib/models.js";

export const AddCitat: Command = {
  name: "addcitat",
  description: "Přidá citát",
  options: [
    {
      name: "quote",
      description: "Citát",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "teacher",
      description: "Učitel (Přijmení)",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const quote = interaction.options.get("quote")?.value as string;
    const teacher = interaction.options.get("teacher")?.value as string;
    const author = interaction.user.tag;
    const time = Date.now();

    const obj = new Quotes({quote: quote, teacher, author, time});
    await obj.save();

    await interaction.reply({content: "Citat byl přidán"});
  }
};
