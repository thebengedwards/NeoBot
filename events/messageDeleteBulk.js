const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require("moment")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, messages) => {
    let message = messages.find(item => item.content.startsWith('!purge'))

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

        embed.setDescription(`Purge detected in chanel: ${message.channel.name}`)
        embed.addFields(
            { name: `Purged by: ${message.author.username}`, value: `Messages Deleted: ${message.content.charAt(message.content.length - 1)}` },
            { name: `Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, value: `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};