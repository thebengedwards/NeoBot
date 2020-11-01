const Discord = require('discord.js')
const cron = require('cron')
const settings = require('../settings.json');
const dates = require('../dates')

module.exports = client => {
    const eventEmbed = require('../embeds/eventEmbed')
    const embed = new Discord.MessageEmbed(eventEmbed)

    dates.forEach((event) => {
        if(event.eventType === 'Birthday') {
            let birthday = new cron.CronJob(`${event.cron}`, () =>
            {
                embed.setDescription('Birthday')
                embed.addField(`<${event.id}>, ${fName.toUpperCase()}, IT\'S YOUR BIRTHDAY!`, `Can we all please wish ${event.gender} a happy Birthday!!!`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            birthday.start()
        } else if(event.eventType === 'Calendar') {
            console.log('Calendar Code here')
            return client.channels.cache.get(settings.general).send({ embed });
        } else if(event.eventType === 'WeeklyMeme') {
            console.log('WeeklyMeme Code here')
            return client.channels.cache.get(settings.general).send({ embed });
        } else {
            return client.channels.cache.get(settings.mod).send({ embed });
        }
    })
};