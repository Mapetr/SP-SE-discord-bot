import {
  APIInteractionResponse,
  InteractionResponseType,
  MessageFlags
} from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';

export function SendReply(message: string, ephemeral: boolean): APIInteractionResponse {
  const response: APIInteractionResponse = {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: message,
    }
  }
  if (ephemeral) {
    response.data.flags = MessageFlags.Ephemeral;
  }
  return response;
}
