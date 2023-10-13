const { EmbedBuilder } = require("@discordjs/builders")
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: "voiceStateUpdate",
    execute: async(oldMember, newMember) => {
        let client = oldMember.client;
        const logchannel = client.channels.cache.get("805532356571955210")
        let newUserChannel = newMember.channel
        let oldUserChannel = oldMember.channel

        if (oldMember.id === client.user.id && oldUserChannel !== newUserChannel) {
            mainchannel = client.channels.cache.get("984927155190390814")
	        joinVoiceChannel({
		    channelId: mainchannel.id,
		    guildId: mainchannel.guild.id,
		    adapterCreator: mainchannel.guild.voiceAdapterCreator,
	        });
            return;
        } 
        if (oldUserChannel === null && newUserChannel !== null) {
            var embedjoin = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle("Пользователь подключился к голосовому каналу")
            .setAuthor({name: "FIB | GTA5RP"})
            .setDescription("Пользователь: <@" + newMember + ">\nКанал: <#" + newUserChannel + ">")
            .setTimestamp()
            .setFooter({ text: newUserChannel.id + " / " + newMember.id});
            
            logchannel.send({ embeds: [embedjoin] })
        } else if (newUserChannel === null) {
            var embedleave = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle("Пользователь отключился от голосового канала")
            .setAuthor({name: "FIB | GTA5RP"})
            .setDescription("Пользователь: <@" + oldMember + ">\nКанал: <#" + oldUserChannel + ">")
            .setTimestamp()
            .setFooter({ text: oldUserChannel.id + " / " + oldMember.id });

            logchannel.send({ embeds: [embedleave] })
        } else if (oldUserChannel !== newUserChannel) {
            var embedswitch = new EmbedBuilder()
            .setColor(0xFFDF00)
            .setTitle("Пользователь сменил голосовой канал")
            .setAuthor({name: "FIB | GTA5RP"})
            .setDescription("Пользователь: <@" + newMember + ">\n\nКанал:\n<#" + oldUserChannel + "> ``->`` <#" + newUserChannel + ">")
            .setTimestamp()
            .setFooter({ text: oldUserChannel.id + " -> " + newUserChannel.id + " / " + oldMember.id});

            logchannel.send({ embeds: [embedswitch] })
        }
    }
}