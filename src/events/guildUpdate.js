const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "guildUpdate",
    execute: async(oldGuild, newGuild) => {
        const logchannel = oldGuild.client.channels.cache.get("805532484094918716");

        const fetchedLogs = await oldMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.GuildUpdate });
        const guildLog = fetchedLogs.entries.first();

        var embedguildnotfound = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Параметры сервера изменены")
        .setAuthor({name: "FIB | GTA5RP"})
        .addFields(
            { name: 'Старое название:', value: "``" + oldGuild.name + "``", inline: true},
            { name: 'Новое название:', value: "``" + newGuild.name + "``", inline: true})
        .setTimestamp()

        if (!guildLog && oldGuild.name !== newGuild.name) return logchannel.send({ embeds: [embedguildnotfound] });

        const { executor } = guildLog;

        var embedguild = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Параметры сервера изменены")
        .setAuthor({name: "FIB | GTA5RP"})
        .addFields(
            { name: 'Старое название:', value: "``" + oldGuild.name + "``", inline: true},
            { name: 'Новое название:', value: "``" + newGuild.name + "``", inline: true})
        .setTimestamp()

        if(oldGuild.name !== newGuild.name) return logchannel.send({ embeds: [embedguild] });
    }
}