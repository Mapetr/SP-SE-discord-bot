import * as Discord from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
// Commands
import { ping } from './ping.ts';

declare interface Command {
  name: string;
  description: string;
  default_member_permissions: string;
  dm_permission?: boolean;
  options?: Array<Discord.APIApplicationCommandOption>;
  execute: (interaction: Discord.APIInteraction) => Promise<Discord.APIInteractionResponse>;
}

export const commands: Array<Command> = [ping];
