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

    if (data.serverID === message.guild.id && message.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`A Message was deleted from ${message.channel}`)
        embed.addFields(
            { name: `Sent by: ${message.author.tag}`, value: message.content !== '' ? `${message.content}` : `Embed Type: ${message.embeds[0].title}, Embed Name: ${message.embeds[0].description}` },
            { name: `Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, value: `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}` },
        )

        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};