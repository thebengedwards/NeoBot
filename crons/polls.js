import { MessageEmbed } from "discord.js";
import cron from "cron";
import { AllServers } from "../functions/http-functions/servers.js";
import { GetAllGames } from "../functions/http-functions/games.js";
import PollEmbed from "../components/embeds/pollEmbed.js";

export default async (client) => {
    try {
        const guilds = [...client.guilds.cache];
        let model;
        await AllServers()
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status == 'success' && guilds.length) {
            model.resultItems.map(async (item) => {
                if (client.guilds.cache.get(item.serverid)) {
                    if (item.polls && item.generalchannelid == client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                        let games;
                        await GetAllGames()
                            .then(res => games = res.data.model)
                            .catch(err => games = err.response.data.model);

                        if (games.status == 'success') {
                            let weeklyGame = new cron.CronJob(`00 00 19 * * 5`, () => {
                                const embed = new MessageEmbed(PollEmbed)

                                getGame = async () => {
                                    let game = games.resultItems[Math.floor(Math.random() * games.resultItems.length)];

                                    embed.setDescription('Game poll')
                                    embed.addFields(
                                        { name: `🎮 Would anyone be up for a game of ${game.gamename}? 🎮`, value: `Can be played with ${game.playwith} others.` },
                                        { name: 'Game Type:', value: `${game.gametype}`, inline: true },
                                        { name: 'Game Rating:', value: `${game.gamerating}`, inline: true },
                                        { name: '\u200B', value: '---VOTES---' },
                                        { name: 'YES', value: `None`, inline: true },
                                        { name: 'NO', value: `None`, inline: true },
                                        { name: `↓ Vote Below ↓`, value: `👍 = Yes || 👎 = No` },
                                    )

                                    let embedMessage = await client.channels.cache.get(item.generalchannelid).send({ embeds: [embed] });
                                    await embedMessage.react('👍')
                                    await embedMessage.react('👎')
                                }
                                getGame();
                            });
                            weeklyGame.start()
                        }
                    }
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
};