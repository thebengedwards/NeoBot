const Discord = require('discord.js')
const cron = require('cron')
const servers = require('../arrays/servers')
const calendars = require('../arrays/calendars')

module.exports = client => {
    servers.forEach((server) => {
        if (server.calendar) {
            calendars.forEach((calendar) => {
                let event = new cron.CronJob(`${calendar.cron}`, () => {
                    const eventEmbed = require('../embeds/eventEmbed')
                    const embed = new Discord.MessageEmbed(eventEmbed)
    
                    embed.setDescription('Calendar')
                    embed.addField(`${calendar.id} HAPPY ${calendar.lName.toUpperCase()} EVERYONE! ${calendar.id}`, `@everyone, have a great ${calendar.lName}.`)
                    return client.channels.cache.get(server.generalChannelID).send({ embed });
                });
                event.start()
            }
        )}
    })
};