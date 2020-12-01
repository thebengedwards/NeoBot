const Discord = require('discord.js')
const cron = require('cron')
const api = require("imageapi.js");
const servers = require('../arrays/servers')

module.exports = client => {
    servers.forEach((server) => {
        if (server.weeklyMeme) {
            let event = new cron.CronJob(`00 00 20 * * 5`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                var img;
                let subreddits = require('../arrays/subreddits');
                getImg = async() => {
                    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
                    img = await api(subreddit.name);

                    if (img.endsWith('.mp4')) {
                        // Discord bot does not support mp4 types, so just run the function again
                        getImg();
                    } else {
                        embed.setDescription('Weekly Meme')
                        embed.addField(`This meme is brought to you by:`, `r/${subreddit.name}`)
                        embed.setImage(img);
                        return client.channels.cache.get(server.memesChannelID).send({ embed });
                    }
                }
                getImg();
            });
            event.start()
        }
    })
};