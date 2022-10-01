import {Command} from "./Command";
import {APIActionRowComponent, APIButtonComponent, APIButtonComponentWithCustomId, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Client, CommandInteraction, ComponentType} from "discord.js";

export const AddRole: Command = {
  name: "addrole",
  description: "Add role to reaction role message",
  defaultMemberPermissions: ["ManageGuild"],
  options: [
    {
      name: "id",
      description: "ID zprávy",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "role",
      description: "Role",
      type: ApplicationCommandOptionType.Role,
      required: true
    },
    {
      name: "emoji",
      description: "Volitelne emoji pro tlacitko",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const messageId = interaction.options.get("id")?.value as string;
    const roleId = interaction.options.get("role")?.value as string;
    const emoji = interaction.options.get("emoji")?.value as string;

    const message = 
      interaction.channel?.messages.cache.get(messageId)
      || await interaction.channel?.messages.fetch(messageId);
    if (message) {
      if (message.author.id !== client.user?.id) {
        await interaction.reply({ content: "Tato zpráva není moje.", ephemeral: true });
        return;
      }

      const role = 
        interaction.guild?.roles.cache.get(roleId)
        || await interaction.guild?.roles.fetch(roleId);
      if (role) {
        const components = message.components.flatMap(x => x.components)
          .filter(x => x.type === ComponentType.Button)
          .map(x => x.toJSON()) as APIButtonComponent[];

        if (components.find(x => (x as APIButtonComponentWithCustomId).custom_id === `role_${role.id}`)) {
          await interaction.reply({ content: "Tato role již je v seznamu.", ephemeral: true });
          return;
        }

        const bb = new ButtonBuilder()
          .setCustomId(`role_${role.id}`)
          .setLabel(role.name)
          .setStyle(ButtonStyle.Primary);

        if (emoji) {
          bb.setEmoji(emoji);
        }

        components.push(bb.toJSON());

        if (components.length > 25) {
          await interaction.reply({ content: "Byl překročen maximální počet tlačítek ve zprávě", ephemeral: true });
          return;
        }

        const outComponents: APIActionRowComponent<APIButtonComponent>[] = [];

        // 5 is the maximum amount of buttons in an action row
        for (let i = 0; i < components.length; i += 5) {
          outComponents.push({
            type: ComponentType.ActionRow,
            components: components.slice(i, i + 5)
          });
        }

        await message.edit({
          components: outComponents
        });
        await interaction.reply({content: "Role byla přidána na seznam!", ephemeral: true});
      } else await interaction.reply({content: "Role nenalezena", ephemeral: true});
    } else await interaction.reply({content: "Zpráva nenalezena", ephemeral: true});
  }
}
