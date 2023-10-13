const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    execute: async(member) => {
        let client = member.client;
        const logchannel = client.channels.cache.get("1030992318339240026");

        var embedkicknotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Пользователя выгнали с сервера")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + member.id + "> был изгнан.")
        .setTimestamp()
        .setFooter({ text: member.id});

        const fetchedLogs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
        const kickLog = fetchedLogs.entries.first();

        if (!kickLog) return logchannel.send({ embeds: [embedkicknotfound] });
        const { executor, target, reason } = kickLog;

        var embedkick = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Пользователя выгнали с сервера")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + member.user + "> был изгнан.\nИзгнал: <@" + executor.id + ">\nПричина: ``" + reason + "``")
        .setTimestamp()
        .setFooter({ text: member.id + " / " + executor.id });

        var embeduninvite = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("Пользователя выгнали с сервера")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь <@" + member.user + "> был изгнан.\nИзгнан в связи с увольнением.")
        .setTimestamp()
        .setFooter({ text: member.id + " / " + executor.id });

        if(executor.id === "941484623844753438") return logchannel.send({ embeds: [embeduninvite] });

        if (target.id === member.id) {
            logchannel.send({ embeds: [embedkick] });
        } else {
            logchannel.send({ embeds: [embedkicknotfound] });
        }
    }
}