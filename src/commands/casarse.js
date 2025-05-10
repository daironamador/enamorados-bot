const { SlashCommandBuilder } = require('discord.js');
const db = require('../firebase/firebase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('casarse')
    .setDescription('¡Cásate si tu relación está en el nivel máximo! 💍'),
  async execute(interaction) {
    const userId = interaction.user.id;
    const parejaRef = db.collection('parejas').doc(userId);
    const parejaSnap = await parejaRef.get();

    if (!parejaSnap.exists) {
      return interaction.reply({ content: 'No tienes pareja aún 💔', flags: 64 });
    }

    const data = parejaSnap.data();
    const parejaId = data.parejaId;

    if (data.nivel < 3) {
      return interaction.reply({ content: '💡 Necesitas alcanzar el nivel máximo (💍 Casados) para usar este comando.', flags: 64 });
    }

    await interaction.reply(`🎉💒 ¡<@${userId}> y <@${parejaId}> se han casado oficialmente en Emparejados! ¡Felicidades! 🎊`);
  }
};
