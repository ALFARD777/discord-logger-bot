const TelegramBot = require('node-telegram-bot-api');
const tgbot = new TelegramBot('5720178639:AAHCxaxktTdHoPiXxCOf-AIHZo7aS5o_5tY');

module.exports = {
	name: 'messageCreate',
	execute: async (message) => {
		const client = message.client;
		let content = message.content;
		const questchannel = client.channels.cache.get('1026182861507797002');
		if (message.author.bot) return;
		if (message.channel.type === 'dm') return;
		if (message.channel.id === questchannel.id) return tgbot.sendMessage(750896683, 'Задание от куратора было выполнено!');
		if (content.includes('<@&708654768813506561>') && message.channel.id !== questchannel.id) {
			let pos = 0;
			// eslint-disable-next-line no-constant-condition
			while (true) {
				String.prototype.replaceBetween = function(start, end, what) {
					return this.substring(0, start) + what + this.substring(end);
				};
				const foundpos1 = content.indexOf('<', pos);
				const foundpos2 = content.indexOf('>', pos);
				content = content.replaceBetween(foundpos1, foundpos2, '<TAG');
				if (foundpos1 === -1 || foundpos2 === -1) break;
				pos = foundpos1 + 1;
			}
			// content = content.replace(/ */g, '')
			tgbot.sendMessage(750896683, `Вас тегнули в канале ${message.channel.name}!\n\nСодержимое:\n${content}`);
			return;
		}
	},
};
