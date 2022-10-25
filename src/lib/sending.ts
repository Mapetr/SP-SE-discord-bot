import {Client, EmbedBuilder, TextChannel} from "discord.js";
import {Log} from "./models.js";

export async function sendLog(embed: EmbedBuilder, client: Client, guild: string): Promise<void> {
  if (embed.data.fields?.length === 0) return;
  const channel = (await Log.findOne({guild: guild}).exec())?.channel;
  if (!channel) return;
  const sendChannel = client.channels.cache.get(channel) as TextChannel;
  if (!sendChannel) return;
  await sendChannel.send({embeds: [embed]});
}
