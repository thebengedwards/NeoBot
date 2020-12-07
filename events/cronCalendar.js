const Discord = require('discord.js')
const fetch = require('node-fetch')
const cron = require('cron')
const moment = require('moment')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    data.map(async (item) => {
        if (item.calendar === 1) {
            let calendars = await fetch(`${PATH}/calendars`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            }).then(res => res.json());

            if (calendars) {
                calendars.map((item2) => {
                    let calendar = moment(new Date(item2.cron)).format('DD MM')
                    let split = calendar.split(" ")

                    let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                        const eventEmbed = require('../embeds/eventEmbed')
                        const embed = new Discord.MessageEmbed(eventEmbed)

                        embed.setDescription('Calendar')
                        embed.addField(`HAPPY ${item2.name.toUpperCase()} EVERYONE!`, `@everyone, have a great ${item2.name}.`)
                        return client.channels.cache.get(item.generalChannelID).send({ embed });
                    });
                    event.start()
                }
                )
            }
        }
    })
};