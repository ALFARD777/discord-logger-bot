const { EmbedBuilder, AuditLogEvent } = require("discord.js");

module.exports = {
    name: 'channelUpdate',
    execute: async(oldChannel, newChannel) => {
        let client = oldChannel.client;
        let oldCategory = oldChannel.parent;
        let newCategory = newChannel.parent;
        if(!oldCategory) oldCategory = 'Без категории';
        if(!newCategory) newCategory = 'Без категории';
        const logchannel = client.channels.cache.get("805532356571955210");

        let fetchedLogs = await newChannel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelUpdate });
        const updateLog = fetchedLogs.entries.first();

        let types = {
            0: 'Текстовый канал',
            2: 'Голосовой канал',
            1: 'Неизвестно',
            undefined: 'Неизвестно',
        };

        var embednamenotfound = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Канал был обновлен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Тег канала: <#" + newChannel.id + ">\nТип канала: ``" + types[newChannel.type] + "``" + "\nКатегория: ``" + newCategory.name + "``")
        .addFields(
            { name: 'Старое название:', value: "``" + oldChannel.name + "``", inline: true},
            { name: 'Новое название:', value: "``" + newChannel.name + "``", inline: true },
        )
        .setTimestamp()
        .setFooter({ text: newChannel.id});

        var embedcatnotfound = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("Канал был обновлен")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Тег канала: <#" + newChannel.id + ">\nНазвание канала: ``" + newChannel.name + "``\nТип канала: ``" + types[newChannel.type] + "``")
        .addFields(
            { name: 'Старая категория: ', value: "``" + oldCategory + "``", inline: true },
            { name: 'Новая категория: ', value: "``" + newCategory + "``", inline: true },
        )
        .setTimestamp()
        .setFooter({ text: newChannel.id });

        if (!updateLog) {
            if(oldChannel.name !== newChannel.name){
                logchannel.send({ embeds: [embednamenotfound] });
                return;
            } else if (oldCategory !== newCategory){
                logchannel.send({ embeds: [embedcatnotfound] });
                return;
            }
        }

        const { executor } = updateLog;
        
        if (oldChannel.name !== newChannel.name){
            var embedname = new EmbedBuilder()
            .setColor(0xFFDF00)
            .setTitle("<:text2:1031647105221144757> Канал был обновлен")
            .setAuthor({name: "FIB | GTA5RP"})
            .setDescription("Обновил: <@" + executor.id + ">\nТег канала: <#" + newChannel.id + ">\nТип канала: ``" + types[newChannel.type] + "``" + "\nКатегория: ``" + newCategory.name + "``")
            .addFields(
                { name: 'Старое название:', value: "``" + oldChannel.name + "``", inline: true},
                { name: 'Новое название:', value: "``" + newChannel.name + "``", inline: true },
            )
            .setTimestamp()
            .setFooter({ text: newChannel.id});

            logchannel.send({ embeds: [embedname] });
        } else if (oldCategory !== newCategory){
            var embedcat = new EmbedBuilder()
            .setColor(0xFFDF00)
            .setTitle("<:text2:1031647105221144757> Канал был обновлен")
            .setAuthor({name: "FIB | GTA5RP"})
            .setDescription("Обновил: <@" + executor.id + ">\nТег канала: <#" + newChannel.id + ">\nНазвание канала: ``" + newChannel.name + "``\nТип канала: ``" + types[newChannel.type] + "``")
            .addFields(
                { name: 'Старая категория: ', value: "``" + oldCategory.name + "``", inline: true },
                { name: 'Новая категория: ', value: "``" + newCategory.name + "``", inline: true },
            )
            .setTimestamp()
            .setFooter({ text: newChannel.id });

            logchannel.send({ embeds: [embedcat] });
        }
    }
}