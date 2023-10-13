const { EmbedBuilder, AuditLogEvent } = require("discord.js");

module.exports = {
    name: 'channelCreate',
    execute: async(channel) => {
        let client = channel.client;
        let category = channel.parent;
        if (!category) category = 'Без категории';
        const logchannel = client.channels.cache.get("805532356571955210");

        let types = {
            0: 'Текстовый канал',
            2: 'Голосовой канал',
            1: 'Неизвестно',
            undefined: 'Неизвестно',
        };

        let fetchedLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelCreate});
        const createLog = fetchedLogs.entries.first();

        var embedcreatenotfound = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("<:text:1031362422168100926> Создан новый канал")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Канал: <#" + channel.id + ">\nИмя канала: ``" + channel.name + "``\nТип канала: ``" + types[channel.type] + "``\nКатегория: ``" + category.name + "``")
        .setTimestamp()
        .setFooter({ text: channel.id});

        if (!createLog) return logchannel.send({ embeds: [embedcreatenotfound] });

        const { executor, id } = createLog;
        var embedcreate = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle("<:text:1031362422168100926> Создан новый канал")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Канал: <#" + channel.id + ">\nСоздал: <@" + executor.id + ">\nИмя канала: ``" + channel.name + "``\nТип канала: ``" + types[channel.type] + "``\nКатегория: ``" + category.name + "``")
        .setTimestamp()
        .setFooter({ text: channel.id + " / " + executor.id});

        if(id) logchannel.send({ embeds: [embedcreate] });
        else logchannel.send({ embeds: [embedcreatenotfound] });
    }
}