import { InteractionResponseType, MessageFlags } from 'https://deno.land/x/discord_api_types@0.37.20/v10.ts';

export function SendReply(message: string, ephemeral: boolean = false) {
  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: message,
      flags: ephemeral ?? MessageFlags.Ephemeral,
    }
  }
}
