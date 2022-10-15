import {Command} from "./Command.js";
import {Client, CommandInteraction} from "discord.js";
import fsPromises from "fs/promises";

export const SetChannel: Command = {
  name: "setchannel",
  description: "Set channel for bot logging",
  defaultMemberPermissions: ["ManageGuild"],
  run: async (client: Client, interaction: CommandInteraction) => {
    const data = {
      channel: interaction.channelId,
    }
    await fsPromises.writeFile('./config.json', JSON.stringify(data));
    await interaction.reply({content: `Kanál nastaven`, ephemeral: true});
  }
}
