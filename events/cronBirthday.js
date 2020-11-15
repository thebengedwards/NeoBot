const Discord = require('discord.js')
const cron = require('cron')
const servers = require('../arrays/servers')
const birthdays = require('../arrays/birthdays')

module.exports = client => {
    birthdays.forEach((birthday) => {
        let server = servers.find(item => birthday.serverID == item.serverID)
        if (server) {
            let event = new cron.CronJob(`${birthday.cron}`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Birthday')
                embed.addField(`🎂 ${birthday.fName.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${birthday.id}> a happy Birthday!!!`)
                return client.channels.cache.get(server.generalChannelID).send({ embed });
            });
            event.start()
        }
    })
};