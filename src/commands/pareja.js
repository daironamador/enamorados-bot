const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../firebase/firebase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pareja')
    .setDescription('Mira tu relación de pareja actual 💘'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const parejaRef = db.collection('parejas').doc(userId);
    const parejaSnap = await parejaRef.get();

    if (!parejaSnap.exists) {
      return interaction.reply({ content: 'No tienes pareja aún 💔', flags: 64 });
    }

    const data = parejaSnap.data();
    const niveles = ['💛 Conociéndose', '💚 Enamorados', '❤️ Súper novios', '💍 Casados'];
    const barra = '▓'.repeat(data.progreso / 10) + '░'.repeat(10 - data.progreso / 10);

    const embed = new EmbedBuilder()
      .setTitle(`👩‍❤️‍👨 Relación de ${interaction.user.username}`)
      .addFields(
        { name: 'Pareja', value: `<@${data.parejaId}>`, inline: true },
        { name: 'Nivel', value: niveles[data.nivel], inline: true },
        { name: 'Progreso', value: `${barra} ${data.progreso}%`, inline: false },
        { name: 'Desde', value: data.desde, inline: true }
      )
      .setColor(0xff69b4)
      .setThumbnail(interaction.user.displayAvatarURL());

    await interaction.reply({ embeds: [embed] });
  }
};
