const Discord = require("discord.js")
const cron = require("cron")
const api = require("imageapi.js");
const { AllServers } = require("../functions/http-functions/servers");
const { GetAllSubreddits } = require("../functions/http-functions/subreddits");

module.exports = async (client) => {
    try {
        const guilds = [...client.guilds.cache];
        let model;
        await AllServers()
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status == 'success' && guilds.length) {
            model.resultItems.map(async (item) => {
                if (client.guilds.cache.get(item.serverid)) {
                    if (item.weeklymeme && item.generalchannelid == client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                        let subredditsJson;
                        await GetAllSubreddits()
                            .then(res => subredditsJson = res.data.model)
                            .catch(err => subredditsJson = err.response.data.model);

                        subreddits = subredditsJson.resultItems.map(item => {
                            return item.subredditname;
                        });

                        let event = new cron.CronJob(`00 00 20 * * 5`, () => {
                            const eventEmbed = require('../embeds/eventEmbed')
                            const embed = new Discord.MessageEmbed(eventEmbed)

                            let img;
                            getImg = async () => {
                                let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
                                img = await api(subreddit);

                                if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.gif')) {
                                    embed.setDescription('Weekly Meme')
                                    embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                                    embed.setImage(img);
                                    return client.channels.cache.get(item.memeschannelid).send({ embed });
                                } else {
                                    getImg();
                                }
                            }
                            getImg();
                        });
                        event.start()
                    }
                }
            })
        }
    } catch {
        console.log('Error connecting to API')
    }
};