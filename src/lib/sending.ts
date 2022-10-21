import data from "../../config.json" assert {type: "json"};
import {Client, EmbedBuilder, TextChannel} from "discord.js";
import {captureException} from "@sentry/node";

export async function sendLog(embed: EmbedBuilder, client: Client) {
  if (embed.data.fields?.length === 0) return;
  const sendChannel = client.channels.cache.get(data.channel) as TextChannel;
  if (sendChannel) await sendChannel.send({embeds: [embed]});
  else captureException("Events: Channel is non-existent");
}
