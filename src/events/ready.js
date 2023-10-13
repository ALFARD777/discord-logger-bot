const { joinVoiceChannel } = require("@discordjs/voice");
const { ActivityType } = require("discord.js");
const TelegramBot = require("node-telegram-bot-api");
const tgbot = new TelegramBot("5720178639:AAHCxaxktTdHoPiXxCOf-AIHZo7aS5o_5tY");
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `за фракцией FIB`, `за складом FIB` , `за твинками FIB`, `за поставками FIB`, `за рейдами FIB` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Watching }), 22000);
	mainchannel = client.channels.cache.get("984927155190390814")
	joinVoiceChannel({
		channelId: mainchannel.id,
		guildId: mainchannel.guild.id,
		adapterCreator: mainchannel.guild.voiceAdapterCreator,
	});
}};
