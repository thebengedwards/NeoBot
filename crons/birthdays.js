const Discord = require("discord.js")
const fetch = require("node-fetch")
const cron = require("cron")
const moment = require("moment")

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
        if (item.birthdays === 1 && item.generalChannelID === client.guilds.cache.get(item.serverID).channels.cache.get(item.generalChannelID).id) {
            let birthdays = await fetch(`${PATH}/birthdays/${item.serverID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json());

            if (birthdays) {
                birthdays.map(async (item2) => {
                    let birthday = moment(new Date(item2.cron)).format('DD MM')
                    let split = birthday.split(" ")

                    let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                        const eventEmbed = require('../embeds/eventEmbed')
                        const embed = new Discord.MessageEmbed(eventEmbed)

                        embed.setDescription('Birthday')
                        embed.addField(`🎂 ${item2.fName.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${item2.discordID}> a happy Birthday!!!`)
                        return client.channels.cache.get(item.generalChannelID).send({ embed });
                    });
                    event.start()
                })
            }
        }
    })
};