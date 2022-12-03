import { Command } from './mod.ts';
import { SendReply } from '../util/mod.ts';

export const ping: Command = {
  name: 'ping',
  description: 'Ping!',
  execute: (_interaction) => {
    return Promise.resolve(SendReply('Pong!', false));
  }
}
