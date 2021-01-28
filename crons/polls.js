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
        if (item.polls === 1 && item.generalChannelID === client.guilds.cache.get(item.serverID).channels.cache.get(item.generalChannelID).id) {
            let gamesJson = await fetch(`${PATH}/games`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json());

            let weeklyGame = new cron.CronJob(`00 00 20 * * 5`, () => {
            // let weeklyGame = new cron.CronJob(`00 * * * * *`, () => {
                const pollEmbed = require('../embeds/pollEmbed')
                const embed = new Discord.MessageEmbed(pollEmbed)

                let games = gamesJson;
                getGame = async () => {
                    let game = games[Math.floor(Math.random() * games.length)];

                    embed.setDescription('Game poll')
                    embed.addFields(
                        { name: `🎮 Would anyone be up for a game of ${game.gameName}? 🎮`, value: `Can be played with ${game.playWith} others.` },
                        { name: 'Game Type:', value: `${game.gameType}`, inline: true },
                        { name: 'Game Rating:', value: `${game.gameRating}`, inline: true },
                        { name: '\u200B', value: '---VOTES---' },
                        { name: 'YES', value: `None`, inline: true },
                        { name: 'NO', value: `None`, inline: true },
                        { name: `↓ Vote Below ↓`, value: `👍 = Yes || 👎 = No` },
                    )

                    let embedMessage = await client.channels.cache.get(item.modChannelID).send({ embed });
                    await embedMessage.react('👍')
                    await embedMessage.react('👎')
                }
                getGame();
            });
            weeklyGame.start()
        }
    })
};