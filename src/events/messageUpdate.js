const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    name: "messageUpdate",
    execute: async(oldMessage, newMessage) => {
        if (!oldMessage.author) return;
        let client = oldMessage.client;
        var embed = new EmbedBuilder()
        .setColor(0xFFDF00)
        .setTitle("<:message_gray_update_yellow:1040760363865604156> Сообщение отредактировано")
        .setAuthor({name: "FIB | GTA5RP"})
        .setDescription("Пользователь: <@" + oldMessage.author + ">\nКанал: <#" + oldMessage.channel + ">\n\nСтарое сообщение:\n```" + oldMessage.content + "```\nНовое сообщение:\n```" + newMessage.content + "```")
        .setTimestamp()
        .setFooter({ text: oldMessage.id + " / " + oldMessage.author.id});
        const logchannel = client.channels.cache.get("805531923702743081");
        if(oldMessage.content !== newMessage.content && oldMessage.author.id !== "941484623844753438") return logchannel.send({ embeds: [embed] });
    }
}