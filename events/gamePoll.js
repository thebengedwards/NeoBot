const Discord = require('discord.js')
const cron = require('cron')
const servers = require('../arrays/servers')

module.exports = client => {
    let weeklyGame = new cron.CronJob(`00 00 20 * * 5`,() => {
        const pollEmbed = require('../embeds/pollEmbed')
        const embed = new Discord.MessageEmbed(pollEmbed)

        let games = require('../arrays/games');
        getGame = async () => {
            let game = games[Math.floor(Math.random() * games.length)];

            embed.setDescription('Game poll')
            .addFields(
                { name: `Would anyone be up for a game of ${game.gameName}?`, value: `Can be played with ${game.playWith} others.` },
                { name: '\u200B', value: '\u200B' },
                { name: 'Game Type:', value: `${game.gameType}`, inline: true },
                { name: 'Game Description:', value: `${game.gameDesc}`, inline: true },
                { name: 'Game Rating:', value: `${game.gameRating}`, inline: true },
                { name: `↓ Vote Below ↓`, value: `👍 = Yes || 👎 = No` },
            )

            let embedMessage = await client.channels.cache.get(settings.general).send({ embed });
            await embedMessage.react('👍')
            await embedMessage.react('👎')
        }
        getGame();
    });
    weeklyGame.start()
};