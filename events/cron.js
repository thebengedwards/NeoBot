const Discord = require('discord.js')
const cron = require('cron')
const settings = require('../settings.json');
const dates = require('../dates')

module.exports = client => {
    dates.forEach((event) => {
        if(event.eventType === 'Birthday') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            let birthday = new cron.CronJob(`${event.cron}`, () => {
                embed.setDescription('Birthday')
                embed.addField(`🎂 ${event.fName.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${event.id}> a happy Birthday!!!`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            birthday.start()
        } else if(event.eventType === 'Calendar') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)
            
            let calendar = new cron.CronJob(`${event.cron}`, () => {
                embed.setDescription('Calendar')
                embed.addField(`${event.id} HAPPY ${event.lName.toUpperCase()} EVERYONE! ${event.id}`,`@everyone, have a great ${event.lName}.`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            calendar.start()
        } else if(event.eventType === 'WeeklyMeme') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            let weeklyMeme = new cron.CronJob(`${event.cron}`, () => {
                let subreddit = "dankmemes";
                client.channels.get(memes).send("This week's Funny Meme:");
                randomPuppy(subreddit).then(async url => {
                    await client.channels.get(memes).send({
                        files:
                        [{
                            attachment: url,
                            name: 'meme.png'
                        }]
                    })
                }).catch(err => console.error(err));
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