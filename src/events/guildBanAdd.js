const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "guildBanAdd",
    execute: async(member) => {
        let client = channel.client;
        const logchannel = client.channels.cache.get("1030992318339240026");

        var embedbannotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Пользователь был забанен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + member.id + "> был забанен.")
        .setTimestamp()
        .setFooter({ text: member.id });

        const fetchedLogs = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
        const banLog = fetchedLogs.entries.first();

        if (!banLog) return logchannel.send({ embeds: [embedbannotfound] });

        const { executor, target, reason } = banLog;

        var embedban = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Пользователь был забанен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + ban.user + "> был забанен.\nЗабанил: <@" + executor + ">\nПричина: ``" + reason + "``")
        .setTimestamp()
        .setFooter({ text: member.id + " / " + executor.id });

        if (target.id === ban.user.id) {
            logchannel.send({ embeds: [embedban] });
        } else {
            logchannel.send({ embeds: [embedbannotfound] });
        }
    }
}