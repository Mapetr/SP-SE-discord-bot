import {
  APIInteractionResponse,
  InteractionResponseType,
  MessageFlags
} from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';
import {IAxiodResponse, IRequest} from "https://deno.land/x/axiod@0.26.2/interfaces.ts";

export async function Send(url: string, config?: IRequest): Promise<IAxiodResponse<T>> {
  const conf = config || {};
  config.headers.Authorization = `Bot ${Deno.env.get("DISCORD_BOT_TOKEN")}`;
  return axiod(url, conf);
}
