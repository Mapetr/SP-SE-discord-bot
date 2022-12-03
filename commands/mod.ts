import {
  APIApplicationCommandOption,
  APIInteraction, APIInteractionResponse,
} from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
// Commands
import { ping } from './ping.ts';

export type Command = {
  name: string;
  description: string;
  default_member_permissions?: string;
  dm_permission?: boolean;
  options?: Array<APIApplicationCommandOption>;
  execute: (interaction: APIInteraction) => Promise<APIInteractionResponse>;
}

export const commands: Array<Command> = [ping];
