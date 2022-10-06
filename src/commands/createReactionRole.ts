import {Command} from "./Command";
import {ApplicationCommandOptionType, Client, CommandInteraction, EmbedBuilder} from "discord.js";

export const CreateReactionRole: Command = {
  name: "create",
  description: "Create a reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "title",
      description: "Nazev",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "description",
      description: "Popis",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle(interaction.options.get("title")?.value as string)
      .setColor(0x39BEFD);
    const desc = interaction.options.get("description")?.value as string;
    if (desc)
      embed.setDescription(desc);
    await interaction.channel?.send({embeds: [embed]});
    await interaction.reply({content: "Zpráva byla úspěšně vytvořena!", ephemeral: true})
  }
}
