const { SlashCommandBuilder } = require('discord.js');
const db = require('../firebase/firebase');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('proponer')
    .setDescription('Proponle amor a alguien 🥰')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('La persona a la que le quieres proponer')
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.user;
    const target = interaction.options.getUser('usuario');

    if (user.id === target.id) {
      return interaction.reply({ content: 'No puedes proponerte a ti mismo 😅', flags: 64 });
    }

    const userDoc = db.collection('parejas').doc(user.id);
    const parejaDoc = db.collection('parejas').doc(target.id);

    const [userData, parejaData] = await Promise.all([userDoc.get(), parejaDoc.get()]);

    if (userData.exists || parejaData.exists) {
      return interaction.reply({ content: 'Alguien ya está emparejado 😳', flags: 64 });
    }

    await db.collection('solicitudes').doc(target.id).set({
      de: user.id,
      timestamp: Date.now()
    });

    await interaction.reply(`<@${target.id}> 💌 tienes una propuesta de amor de <@${user.id}>. Responde con \`/aceptar\` si quieres aceptar ❤️`);
  }
};
