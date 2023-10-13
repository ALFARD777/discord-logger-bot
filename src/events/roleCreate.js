const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "roleCreate",
    execute: async(role) => {
        let client = role.client;
        const logchannel = client.channels.cache.get("805532176057499699");

        const fetchedLogs = await role.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.RoleCreate });
        const roleLog = fetchedLogs.entries.first();

        var embedrolenotfound = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("<:role_gray_plus_green:1040760779793772716> Создана новая роль")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Роль: <@&" + role.id + ">")
        .setTimestamp()
        .setFooter({ text: role.id });

        if (!roleLog) return logchannel.send({ embeds: [embedrolenotfound] });

        const { executor, id } = roleLog;

        var embedrole = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("<:role_gray_plus_green:1040760779793772716> Создана новая роль")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + executor.id + "> создал роль.\nРоль: <@&" + role + ">")
        .setTimestamp()
        .setFooter({ text: role.id + " / " + executor.id });

        logchannel.send({ embeds: [embedrole] });
    }
}