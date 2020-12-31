const Discord = require("discord.js")
const fetch = require("node-fetch")
const cron = require("cron")
const api = require("imageapi.js");

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
        if (item.weeklyMeme === 1 && item.memesChannelID !== '0') {
            let subredditsJson = await fetch(`${PATH}/subreddits`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json());

            subreddits = subredditsJson.map(item => {
                return item.subredditName;
            });

            let event = new cron.CronJob(`00 00 20 * * 5`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                let img;
                getImg = async () => {
                    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
                    img = await api(subreddit);

                    if (img.endsWith('.mp4')) {
                        // Discord bot does not support mp4 types, so just run the function again
                        getImg();
                    } else {
                        embed.setDescription('Weekly Meme')
                        embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                        embed.setImage(img);
                        return client.channels.cache.get(item.memesChannelID).send({ embed });
                    }
                }
                getImg();
            });
            event.start()
        }
    }
    )
}