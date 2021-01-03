const Discord = require("discord.js");
const fetch = require("node-fetch")
const moment = require("moment");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, channel, user) => {
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

        embed.setDescription('Started Typing')
        embed.addFields(
            { name: `${user.username} started typing`, value: `In Channel: ${channel.name}` },
            { name: `Channel ID: ${channel.id}`, value: `Channel NSFW: ${channel.nsfw}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};