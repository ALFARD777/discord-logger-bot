const { EmbedBuilder, WebSocketManager } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("[DEV] Статус бота."),
    run: async (client, interaction) => {
        const botowner = "442056549184045081";
        var noperm = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("У Вас нет прав для выполнения данной команды!")
        if(interaction.user.id !== botowner) return interaction.reply({ embeds: [noperm], ephemeral: true });
        var embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle("Статус бота")
        .setDescription("Клиент: Онлайн\nПинг: " + client.ws.ping + "ms\nРабочее время:")
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
 };
