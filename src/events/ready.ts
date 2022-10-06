import {Client} from "discord.js";
import {Commands} from "../Commands";

export default {
  name: 'ready',
  once: true,
  async execute(client: Client) {
    if (!client.user || !client.application) return;
    await client.application.commands.set(Commands).catch(err => console.error(err));
    console.log('Ready!');
  }
}
