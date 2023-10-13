const { EmbedBuilder, WebhookClient } = require('discord.js');
const { inspect } = require('util');
const errorwebhook = 'https://discord.com/api/webhooks/1041734176073846855/XDqbQ1VfSO1x8pAYeAk1hC059989Uk67P58yO_qNIUB4HjRHoZR_Mz2ncd0r9tuYs4uM';
const webhook = new WebhookClient({
	url: errorwebhook, // Ссылку на вебхук 
});

module.exports = (client) => {
	const embed = new EmbedBuilder();
	client.on('error', (err) => {
		console.log(err);

		embed
			.setTitle('Discord API Error')
			.setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
			.setColor('#2F3136')
			.setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
			.setTimestamp();

		return webhook.send({ embeds: [embed] });
	});

	process.on('uncaughtException', (err, origin) => {
		console.log(err, '\n', origin);

		embed
			.setTitle('**Uncaught Exception/Catch**')
			.setColor('Red')
			.setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
			.addFields(
				{ name: 'Error', value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
				{ name: 'Origin', value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
			)
			.setTimestamp();

		return webhook.send({ embeds: [embed] });
	});

	process.on('uncaughtExceptionMonitor', (err, origin) => {
		console.log(err, '\n', origin);

		embed
			.setTitle('**Uncaught Exception Monitor**')
			.setColor('Red')
			.setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
			.addFields(
				{ name: 'Error', value: `\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`` },
				{ name: 'Origin', value: `\`\`\`${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\`` },
			)
			.setTimestamp();

		return webhook.send({ embeds: [embed] });
	});

	process.on('warning', (warn) => {
		console.log(warn);

		embed
			.setTitle('**Uncaught Exception Monitor Warning**')
			.setColor('Red')
			.setURL('https://nodejs.org/api/process.html#event-warning')
			.addFields(
				{ name: 'Warning', value: `\`\`\`${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\`` },
			)
			.setTimestamp();

		return webhook.send({ embeds: [embed] });
	});
};