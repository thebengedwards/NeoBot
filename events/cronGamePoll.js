const Discord = require("discord.js")
const fetch = require("node-fetch")
const cron = require("cron")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.weeklyMeme === 1) {
            let gamesJson = await fetch(`${PATH}/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json());

            let weeklyGame = new cron.CronJob(`00 00 20 * * 5`, () => {
                const pollEmbed = require('../embeds/pollEmbed')
                const embed = new Discord.MessageEmbed(pollEmbed)

                let games = gamesJson;
                getGame = async () => {
                    let game = games[Math.floor(Math.random() * games.length)];

                    embed.setDescription('Game poll')
                        .addFields(
                            { name: `🎮 Would anyone be up for a game of ${game.gameName}? 🎮`, value: `Can be played with ${game.playWith} others.` },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Game Type:', value: `${game.gameType}`, inline: true },
                            { name: 'Game Rating:', value: `${game.gameRating}`, inline: true },
                            { name: `↓ Vote Below ↓`, value: `👍 = Yes || 👎 = No` },
                        )

                    let embedMessage = await client.channels.cache.get(item.generalChannelID).send({ embed });
                    await embedMessage.react('👍')
                    await embedMessage.react('👎')
                }
                getGame();
            });
            weeklyGame.start()
        }
    })
};