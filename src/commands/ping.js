const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Проверка работоспособности бота."),
    run: async (client, interaction) => {
      var embed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle("Pong! :ping_pong:");
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
 };
