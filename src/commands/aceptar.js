const { SlashCommandBuilder } = require('discord.js');
const db = require('../firebase/firebase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('aceptar')
    .setDescription('Acepta una propuesta de amor 💖'),
  async execute(interaction) {
    const user = interaction.user;
    const solicitudDoc = await db.collection('solicitudes').doc(user.id).get();

    if (!solicitudDoc.exists) {
      return interaction.reply({ content: 'No tienes propuestas pendientes 😢', flags: 64 });
    }

    const de = solicitudDoc.data().de;
    const ahora = new Date().toISOString().split('T')[0];

    await db.collection('parejas').doc(user.id).set({
      parejaId: de,
      nivel: 0,
      progreso: 0,
      desde: ahora
    });

    await db.collection('parejas').doc(de).set({
      parejaId: user.id,
      nivel: 0,
      progreso: 0,
      desde: ahora
    });

    await db.collection('solicitudes').doc(user.id).delete();

    await interaction.reply(`💘 ¡Felicidades! <@${user.id}> ahora está emparejad@ con <@${de}>`);
  }
};
