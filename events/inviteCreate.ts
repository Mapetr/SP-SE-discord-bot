import {EmbedBuilder, Invite, TextChannel} from "discord.js";
import data = require('../config.json');

module.exports = {
  name: 'inviteCreate',
  once: false,
  async execute(invite: Invite) {
    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle("Přidán nový invite")
      .setFields(
        { name: 'Kod', value: invite.code },
        { name: 'Vytvořil', value: invite.inviter ? invite.inviter.tag : 'N/A' },
        { name: 'Maximální počet použití', value: invite.maxUses ? invite.maxUses.toString() : 'N/A' },
        { name: 'Vyprší', value: invite.expiresAt ? invite.expiresAt.toString() : 'N/A' },
      )
      .setFooter({ text: `ID: ${invite.inviterId}` })
      .setTimestamp();
    const sendChannel = invite.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
