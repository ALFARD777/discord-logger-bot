const { EmbedBuilder } = require("@discordjs/builders");
const { AuditLogEvent } = require("discord.js");

module.exports = {
    name: "messageDelete",
    execute: async(message) => {
        if (!message.author) return;
        const logchannel = message.client.channels.cache.get("805531923702743081");

        const fetchedLogs = await message.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MessageDelete });
        const messageLog = fetchedLogs.entries.first();

        var embednotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:message_gray_minus_red:1041484367723245588> Сообщение удалено")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Сообщение от: <@" + message.author.id + ">\nКанал: <#" + message.channel + ">\n\nСодержимое:\n```" + message.content + "```")
        .setTimestamp()
        .setFooter({ text: message.id });

        if (!messageLog) return logchannel.send({ embeds: [embednotfound] });

        const { executor } = messageLog;

        var embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:message_gray_minus_red:1041484367723245588> Сообщение удалено")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Удалил: <@" + executor.id + ">\nСообщение от: <@" + message.author.id + ">\nКанал: <#" + message.channel + ">\n\nСодержимое:\n```" + message.content + "```")
        .setTimestamp()
        .setFooter({ text: message.id + " / " + executor.id});

        if(executor.id === message.author) return logchannel.send({ embeds: [embednotfound] });
        else return logchannel.send({ embeds: [embed] });
    }
}