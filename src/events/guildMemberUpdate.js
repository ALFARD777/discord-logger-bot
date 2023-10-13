const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "guildMemberUpdate",
    execute: async(oldMember, newMember) => {
        let client = oldMember.client;
        const logchannel = client.channels.cache.get("1030992318339240026");

        const fetchedLogs = await oldMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
        const updateLog = fetchedLogs.entries.first();

        var embednameself = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Ник пользователя изменен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь: <@" + newMember.id + ">")
        .addFields(
            { name: 'Старый ник:', value: "``" + oldMember.displayName + "``", inline: true},
            { name: 'Новый ник:', value: "``" + newMember.displayName + "``", inline: true})
        .setTimestamp()
        .setFooter({ text: newMember.id });

        if (!updateLog && oldMember.displayName !== newMember.displayName) return logchannel.send({ embeds: [embednameself] });

        const { executor } = updateLog;

        var embedname = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Ник пользователя изменен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Изменил: <@" + executor.id + ">\nПользователь: <@" + newMember.id + ">")
        .addFields(
            { name: 'Старый ник:', value: "``" + oldMember.displayName + "``", inline: true},
            { name: 'Новый ник:', value: "``" + newMember.displayName + "``", inline: true})
        .setTimestamp()
        .setFooter({ text: newMember.id + " / " + executor.id});

        

        if(oldMember.displayName !== newMember.displayName && executor.id !== newMember.id) return logchannel.send({ embeds: [embedname] });
        else if (oldMember.displayName !== newMember.displayName) return logchannel.send({ embeds: [embednameself] });
    }
}