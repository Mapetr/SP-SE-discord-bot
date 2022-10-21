import {
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  GuildMemberRoleManager
} from "discord.js";
import {Commands} from "../Commands.js";
import {captureException} from "@sentry/node";

export default {
  name: 'interactionCreate',
  once: false,
  async execute(interaction: BaseInteraction) {
    if (interaction.isButton()) {
      if (interaction.user.bot || interaction.user.system) return;
      const option = interaction.customId.split("_");
      switch (option[0]) {
        case "role": {
          const roles = <GuildMemberRoleManager>interaction.member?.roles;
          if (roles) {
            const roleId = option[1];
            if (roles.cache.has(roleId)) {
              await roles.remove(roleId);
              await interaction.reply({content: "Role odstraněna", ephemeral: true});
            } else {
              await roles.add(roleId).catch(err => captureException(err));
              await interaction.reply({content: "Role přidána", ephemeral: true});
            }
          }
          break;
        }
        default:
          break;
      }
      return;
    }
    await handleSlashCommand(interaction.client, <ChatInputCommandInteraction>interaction).catch(err => captureException(err));
  }
}

async function handleSlashCommand(client: Client, interaction: CommandInteraction): Promise<void> {
  const slashCommand = Commands.find(c => c.name === interaction.commandName);
  if (!slashCommand) return;
  await slashCommand.run(client, interaction);
}
