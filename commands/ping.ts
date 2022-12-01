import { Command } from './mod.ts';
import { SendReply } from '../util/mod.ts';

export const ping: Command = {
  name: 'ping',
  description: 'Ping!',
  execute: async (interaction) => {
    console.log('Pong!');
    return SendReply('Pong!');
  }
}
