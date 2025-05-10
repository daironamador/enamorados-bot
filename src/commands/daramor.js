const { SlashCommandBuilder } = require('discord.js');
const db = require('../firebase/firebase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daramor')
    .setDescription('Dale amor a tu pareja para subir de nivel 💗'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const parejaRef = db.collection('parejas').doc(userId);
    const parejaSnap = await parejaRef.get();

    if (!parejaSnap.exists) {
      return interaction.reply({ content: 'No tienes pareja aún 💔', flags: 64 });
    }

    const data = parejaSnap.data();
    const parejaId = data.parejaId;

    const now = Date.now();
    const cooldownRef = db.collection('cooldowns').doc(userId);
    const cooldownSnap = await cooldownRef.get();

    if (cooldownSnap.exists && now - cooldownSnap.data().last < 6 * 60 * 60 * 1000) {
      return interaction.reply({ content: '💤 Ya diste amor. Inténtalo más tarde.', flags: 64 });
    }

    let nuevoProgreso = data.progreso + 20;
    let nuevoNivel = data.nivel;

    if (nuevoProgreso >= 100) {
      nuevoProgreso = 0;
      nuevoNivel += 1;
      if (nuevoNivel > 3) nuevoNivel = 3;
    }

    const parejaUserRef = db.collection('parejas').doc(parejaId);

    await Promise.all([
      parejaRef.set({ ...data, progreso: nuevoProgreso, nivel: nuevoNivel }),
      parejaUserRef.set({ ...data, progreso: nuevoProgreso, nivel: nuevoNivel }),
      cooldownRef.set({ last: now })
    ]);

    await interaction.reply(`💖 ¡Amor enviado! <@${parejaId}> ahora tienen **${nuevoProgreso}%** de progreso.`);
  }
};
