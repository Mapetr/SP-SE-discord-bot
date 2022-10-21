import {EmbedBuilder, Invite} from "discord.js";
import {sendLog} from "../lib/sending.js";

export default {
  name: 'inviteDelete',
  once: false,
  async execute(invite: Invite) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Odebrán invite")
      .setFields(
        {name: 'Kod', value: invite.code},
        {name: 'Vytvořil', value: invite.inviter?.tag ?? 'N/A'},
      )
      .setFooter({ text: `ID: ${invite.inviterId}` })
      .setTimestamp();
    await sendLog(embed, invite.client);
  }
}
