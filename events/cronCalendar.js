const Discord = require('discord.js')
const fetch = require('node-fetch')
const cron = require('cron')
const moment = require('moment')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async(client) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    data.map( async (item) => {
        if (item.calendar === 1) {
            let birthdays = await fetch(`${PATH}/birthdays/${item.serverID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json());

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