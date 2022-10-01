import {Message} from "discord.js";

export default {
  name: 'messageCreate',
  once: false,
  async execute(message: Message) {
    if (message.author.bot) return;
  }
}

// TODO: Add leveling system
