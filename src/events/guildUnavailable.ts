import {Guild} from "discord.js";

export default {
  name: 'guildUnavailable',
  once: false,
  async execute(guild: Guild) {
    console.error(`Guild ${guild.name} is unavailable`);
  }
}
