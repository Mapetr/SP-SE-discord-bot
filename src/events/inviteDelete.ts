import {EmbedBuilder, Invite, TextChannel} from "discord.js";
import data from "../../config.json" assert {type: "json"};

export default {
  name: 'inviteDelete',
  once: false,
  async execute(invite: Invite) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odebrán invite")
      .setFields(
        { name: 'Kod', value: invite.code },
        { name: 'Vytvořil', value: invite.inviter?.tag ?? 'N/A' },
      )
      .setFooter({ text: `ID: ${invite.inviterId}` })
      .setTimestamp();
    const sendChannel = invite.client.channels.cache.get(data.channel) as TextChannel;
    if (sendChannel) await sendChannel.send({embeds: [embed]});
    else console.error("Events: Channel is non-existent");
  }
}
