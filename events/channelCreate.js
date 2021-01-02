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

    if (channel.type !== 'dm') {
        if (data.serverID === channel.guild.id && data.modChannelID !== '0') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription('Channel Creation')
            embed.addFields(
                { name: 'A Channel has been Created', value: `Details are listed below.` },
                { name: 'Channel Name', value: `${channel.name}` },
                { name: 'Channel Topic', value: channel.topic !== null ? `${channel.topic}` : `None yet` },
                { name: 'Channel Type', value: `${channel.type}`, inline: true },
                { name: 'Channel ID', value: `${channel.id}`, inline: true },
                { name: 'Channel NSFW', value: `${channel.nsfw}`, inline: true },
            )
            return client.channels.cache.get(data.modChannelID).send({ embed });
        }
    }
};