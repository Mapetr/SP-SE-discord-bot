export default {
  name: 'userUpdate',
  once: false,
  async execute() {
    return;
    /*const embed = new EmbedBuilder()
      .setColor(0xffff00)
      .setTitle("Uživatel upraven")
      .setImage(newUser.avatarURL())
      .setFooter({text: `ID: ${newUser.id}`})
      .setTimestamp();
    // Tag
    if (oldUser.tag !== newUser.tag) {
      embed.addFields({name: 'Tag', value: `${oldUser.tag} -> ${newUser.tag}`});
    }
    // Username
    if (oldUser.username !== newUser.username) {
      embed.addFields({name: 'Uživatelské jméno', value: `${oldUser.username} -> ${newUser.username}`});
    }
    // Discriminator
    if (oldUser.discriminator !== newUser.discriminator) {
      embed.addFields({name: 'Discriminator', value: `${oldUser.discriminator} -> ${newUser.discriminator}`});
    }
    // Avatar
    if (oldUser.avatar !== newUser.avatar) {
      embed.addFields({name: 'Avatar', value: `${oldUser.avatarURL()} -> ${newUser.avatarURL()}`});
    }
    await sendLog(embed, newUser.client);*/
  }
}
