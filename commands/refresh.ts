import { Command, commands } from './mod.ts';
import { SendReply } from '../util/mod.ts';
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { GatewayIntentBits } from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';

export const refresh: Command = {
  name: 'refresh',
  description: 'Refresh commands!',
  default_member_permissions: GatewayIntentBits.ManageGuild,
  execute: async (_interaction) => {
    let commandsFinal: Partial<Command> = commands;
    commandsFinal.forEach((command) => {
      delete command.execute;
    });
    await axiod({
      method: "PUT",
      url: `https://discord.com/api/v10/applications/${Deno.env.get('APPLICATION_ID')}/commands`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${Deno.env.get('TOKEN')}`,
        'User-Agent': 'DiscordBot (https://github.com/Mapetr/SPSSE-discord-bot, 0.3.0)',
      },
      data: JSON.stringify(commandsFinal),
    }).then((res) => {
      return SendReply('Commands refreshed!', true);
    }).catch((err) => {
      console.error(err);
      return SendReply('Error!', true);
    });
  }
}
