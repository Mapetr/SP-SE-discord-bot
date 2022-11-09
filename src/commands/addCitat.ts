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
      description: "Učitel (Přijmení) NEPIŠTE ROK",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "date",
      description: "Datum (DD.MM.YYYY)",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const quote = interaction.options.get("quote")?.value as string;
    const teacher = interaction.options.get("teacher")?.value as string;
    const date = interaction.options.get("date")?.value as string;
    const author = interaction.user.tag;
    const dateArr = date.split(".");
    const time = date ? new Date(parseInt(dateArr[2]), parseInt(dateArr[1]), parseInt(dateArr[0])) : Date.now();

    const obj = new Quotes({quote: quote, teacher, author, time});
    await obj.save();

    await interaction.reply({content: `> ${quote}\n- ${teacher} ${new Date(time).getFullYear()}`});
  }
};
