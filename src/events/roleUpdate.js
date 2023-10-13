const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "roleUpdate",
    execute: async(oldRole, newRole) => {
        let client = oldRole.client;
        const logchannel = client.channels.cache.get("805532176057499699");

        const fetchedLogs = await role.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.RoleUpdate });
        const roleLog = fetchedLogs.entries.first();

        var embedrolenotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:message_gray_update_yellow:1040760363865604156> Роль была обновлена")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Роль: <@&" + oldRole.id + ">")
        .setTimestamp()
        .setFooter({ text: role.id });

        if (!roleLog) return logchannel.send({ embeds: [embedrolenotfound] });

        const { executor, id } = roleLog;

        var embedrole = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("<:message_gray_update_yellow:1040760363865604156> Роль была обновлена")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + executor.id + "> обновил роль.\nРоль: <@&" + oldRole.id + ">")
        .addFields(
            { name: 'Старое название: ', value: oldRole.name, inline: true},
            { name: 'Новое название: ', value: newRole.name, inline: true })
        .setTimestamp()
        .setFooter({ text: id + " / " + executor.id });

        if(oldRole.name !== newRole.name) logchannel.send({ embeds: [embedrole] });
        else logchannel.send({ embeds: [embedrolenotfound] });
    }
}