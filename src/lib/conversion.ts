import {ChannelType, GuildFeature, StickerFormatType} from "discord-api-types/v10";

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

export function convertExplicitContentFilterLevel(level: number): string {
  switch (level) {
    case 0:
      return "Vypnuto";
    case 1:
      return "Nízká (Uživatelé bez rolí)";
    case 2:
      return "Vysoká (Všechny uživatele)";
    default:
      return "Neznámý level";
  }
}

function convertGuildFeature(feature: string): string {
  switch (feature) {
    case GuildFeature.AnimatedBanner:
      return "Animovaný banner";
    case GuildFeature.AnimatedIcon:
      return "Animovaná ikonka";
    case GuildFeature.AutoModeration:
      return "Automatické moderování";
    case GuildFeature.Banner:
      return "Banner";
    case GuildFeature.Community:
      return "Komunita";
    case GuildFeature.Discoverable:
      return "Objevitelný";
    case GuildFeature.Featurable:
      return "Zvýraznitelný";
    case GuildFeature.HasDirectoryEntry:
      return "Má Directory záznam";
    case GuildFeature.Hub:
      return "Hub";
    case GuildFeature.InviteSplash:
      return "Invite splash";
    case GuildFeature.InvitesDisabled:
      return "Invity zakázány";
    case GuildFeature.LinkedToHub:
      return "Linknutý k hubu";
    case GuildFeature.MemberVerificationGateEnabled:
      return "Ověřovací brána členů zapnuta";
    case GuildFeature.MonetizationEnabled:
      return "Monetizace zapnuta";
    case GuildFeature.MoreStickers:
      return "Více stickerů";
    case GuildFeature.News:
      return "Novinky";
    case GuildFeature.Partnered:
      return "Partner";
    case GuildFeature.PreviewEnabled:
      return "Náhled zapnutý";
    case GuildFeature.PrivateThreads:
      return "Soukromá vlákna";
    case GuildFeature.RelayEnabled:
      return "Relay zapnutý";
    case GuildFeature.RoleIcons:
      return "Ikony rolí";
    case GuildFeature.TicketedEventsEnabled:
      return "Ticketed events zapnuté";
    case GuildFeature.VanityURL:
      return "Vanity URL";
    case GuildFeature.Verified:
      return "Ověřený";
    case GuildFeature.VIPRegions:
      return "VIP regiony";
    case GuildFeature.WelcomeScreenEnabled:
      return "Welcome screen zapnutý";
    default:
      return "N/A";
  }
}

export function convertGuildFeatures(features: `${GuildFeature}`[]): string {
  let result = "";
  for (const feature in features) {
    result += `${convertGuildFeature(feature)}, `;
  }
  return result;
}

export function convertStickerFormat(format: StickerFormatType): string {
  switch (format) {
    case StickerFormatType.PNG:
      return "PNG";
    case StickerFormatType.APNG:
      return "APNG";
    case StickerFormatType.Lottie:
      return "LOTTIE";
    default:
      return "Neznámý formát";
  }
}
