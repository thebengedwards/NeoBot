const Discord = require('discord.js')
const cron = require('cron')
const api = require("imageapi.js");
const settings = require('../settings.json');
const dates = require('../arrays/dates')

module.exports = client => {
    dates.forEach((event) => {
        if(event.eventType === 'Birthday') {
            let birthday = new cron.CronJob(`${event.cron}`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Birthday')
                embed.addField(`🎂 ${event.fName.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${event.id}> a happy Birthday!!!`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            birthday.start()
        } else if(event.eventType === 'Calendar') {
            let calendar = new cron.CronJob(`${event.cron}`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Calendar')
                embed.addField(`${event.id} HAPPY ${event.lName.toUpperCase()} EVERYONE! ${event.id}`,`@everyone, have a great ${event.lName}.`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            calendar.start()
        } else if(event.eventType === 'WeeklyMeme') {
            let weeklyMeme = new cron.CronJob(`${event.cron}`,() => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                var img;
                let subreddits = require('../arrays/subreddits');
                getImg = async () => {
                    let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
                    img = await api(subreddit);

                    if(img.endsWith('.mp4')) {
                        // Discord bot does not support mp4 types, so just run the function again
                        getImg();
                    } else {
                        embed.setDescription('Weekly Meme')
                        embed.addField(`This meme is brought to you by:`,`r/${subreddit}`)
                        embed.setImage(img);
                        return client.channels.cache.get(settings.mod).send({ embed });
                        //return client.channels.cache.get(settings.memes).send({ embed });
                    }
                }
                getImg();
            });
            weeklyMeme.start()
        } else {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription('Error')
            embed.addField(`Error with an event`,`An event not matching any types has been activated. Check the console for details`)
            return client.channels.cache.get(settings.mod).send({ embed });
        }
    })
};