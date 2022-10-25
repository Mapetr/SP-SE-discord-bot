import {Command} from "./Command.js";
import {Client, CommandInteraction} from "discord.js";
import {Log} from "../lib/models.js";

export const SetChannel: Command = {
  name: "setchannel",
  description: "Set channel for bot logging",
  defaultMemberPermissions: ["ManageGuild"],
  run: async (client: Client, interaction: CommandInteraction) => {
    const channel = interaction.channelId;
    const find = await Log.findOne({guild: interaction.guildId}).exec();
    if (find?.channel === channel) {
      await interaction.reply({content: "Tento kanál je již nastavený", ephemeral: true});
      return;
    } else if (find?.channel !== channel) {
      await Log.findOneAndUpdate({guild: interaction.guildId}, {channel: channel}, {upsert: true}).exec();
      await interaction.reply({content: "Kanál nastaven", ephemeral: true});
      return;
    }
    const log = new Log({guild: interaction.guildId, channel: channel});
    await log.save().catch(err => {
      console.log(err);
      interaction.reply({content: "Ajaj, něco se nepovedlo", ephemeral: true});
    });
    await interaction.reply({content: `Nastaveno na <#${channel}>`});
  }
}
