const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "guildBanRemove",
    execute: async(member) => {
        let client = channel.client;
        const logchannel = client.channels.cache.get("1030992318339240026");

        var embedunbannotfound = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("Пользователь был раззабанен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + member.id + "> был раззабанен.")
        .setTimestamp()
        .setFooter({ text: member.id });

        const fetchedLogs = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanRemove});
        const unBanLog = fetchedLogs.entries.first();

        if (!unBanLog) return logchannel.send({ embeds: [embedunbannotfound] });

        const { executor, target } = unBanLog;

        var embedunban = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("Пользователь был раззабанен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + ban.user + "> был разбанен.\nРазбанил: <@" + executor + ">")
        .setTimestamp()
        .setFooter({ text: member.id + " / " + executor.id });

        if (target.id === ban.user.id) {
            logchannel.send({ embeds: [embedunban] });
        } else {
            logchannel.send({ embeds: [embedunbannotfound] });
        }
    }
}