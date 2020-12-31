const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require("moment")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, message) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === message.guild.id && data.modChannelID !== '0') {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`A Message was deleted from ${message.channel}`)
        embed.addField(`Sent by: ${message.author.tag}`, `\'${message.cleanContent}\'`)
        embed.addField(`Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}`)

        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};