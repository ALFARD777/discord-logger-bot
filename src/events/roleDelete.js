const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "roleDelete",
    execute: async(role) => {
        let client = role.client;
        const logchannel = client.channels.cache.get("805532176057499699");

        const fetchedLogs = await role.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.RoleDelete });
        const roleLog = fetchedLogs.entries.first();

        var embedrolenotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:role_gray_minus_red:1040761345144004628> Роль была удалена")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Роль: <@&" + role.id + ">")
        .setTimestamp()
        .setFooter({ text: role.id });

        if (!roleLog) return logchannel.send({ embeds: [embedrolenotfound] });

        const { executor, id } = roleLog;

        var embedrole = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:role_gray_minus_red:1040761345144004628> Роль была удалена")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Удалил: <@" + executor.id + ">\nНазвание роли: ``" + role.name + "``")
        .setTimestamp()
        .setFooter({ text: role.id + " / " + executor.id });

        logchannel.send({ embeds: [embedrole] });
    }
}