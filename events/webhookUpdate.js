const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, channel) => {
    let data = await fetch(`${PATH}/servers/${channel.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === channel.guild.id && channel.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Webhook Update')
        embed.addFields(
            { name: `A Webhook on ${channel.name} has been updated`, value: `Type: ${channel.type}` },
            { name: `Channel ID: ${channel.id}`, value: `Check Audit-Log to see which webhook was updated` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
