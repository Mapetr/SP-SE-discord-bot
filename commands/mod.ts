import {
  APIApplicationCommand,
  APIInteraction, APIInteractionResponse,
} from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
// Commands
import { ping } from './ping.ts';
import { authorise } from './authorise.ts';

export type Command = APIApplicationCommand & {
  execute: (interaction: APIInteraction) => Promise<APIInteractionResponse>;
}

export const commands: Array<Command> = [ping, authorise];
