import {ChannelType} from "discord-api-types/v10";

export function convertChannelType(type: ChannelType): string {
  switch (type) {
    case ChannelType.GuildText:
      return "Text";
    case ChannelType.DM:
      return "DM";
    case ChannelType.GuildVoice:
      return "Voice";
    case ChannelType.GroupDM:
      return "Skupinová DM";
    case ChannelType.GuildCategory:
      return "Kategorie";
    case ChannelType.GuildAnnouncement:
      return "Oznámení";
    case ChannelType.PublicThread:
      return "Veřejné vlákno";
    case ChannelType.PrivateThread:
      return "Soukromé vlákno";
    case ChannelType.GuildStageVoice:
      return "Stage Voice";
    case ChannelType.GuildDirectory:
      return "Adresář"; // Could be better translated, I don't really know what this does
    case ChannelType.GuildForum:
      return "Fórum";
    case ChannelType.AnnouncementThread:
      return "Vlákno oznámení";
    default:
      return "Neznámý typ";
  }
}
