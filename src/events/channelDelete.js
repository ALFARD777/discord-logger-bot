const { EmbedBuilder, AuditLogEvent } = require("discord.js");

module.exports = {
    name: 'channelDelete',
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

        let fetchedLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelDelete });
        const deleteLog = fetchedLogs.entries.first();

        var embeddeletenotfound = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:text1:1031635786854047744> Канал был удален")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Имя канала: ``" + channel.name + "``\nТип канала: ``" + types[channel.type] + "``\nКатегория: ``" + category.name + "``\nКанал был создан: <t:" + channel.createdAt + ">")
        .setTimestamp()
        .setFooter({ text: channel.id});

        if (!deleteLog) return logchannel.send({ embeds: [embeddeletenotfound] });

        const { executor, id } = deleteLog;

        var embeddelete = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle("<:text1:1031635786854047744> Канал был удален")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Имя канала: ``" + channel.name + "``\nУдалил: <@" + executor.id + ">\nТип канала: ``" + types[channel.type] + "``\nКатегория: ``" + category.name + "``\nКанал был создан: <t:" + channel.createdAt + ">")
        .setTimestamp()
        .setFooter({ text: channel.id + " / " + executor.id});
        
        if(id) logchannel.send({ embeds: [embeddelete] });
        else logchannel.send({ embeds: [embeddeletenotfound] });
    }
}