const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldChannel, newChannel) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === oldChannel.guild.id) {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription('Channel Update')
            embed.addFields(
                { name: 'A Channel has been Updated', value: `Details are listed below.` },
                { name: 'Channel Name', value: oldChannel.name === newChannel.name ? `${oldChannel.name}` : `${newChannel.name}` },
                { name: 'Channel Topic', value: oldChannel.topic === newChannel.topic ? `${oldChannel.topic}` : `${newChannel.topic}`},
                { name: 'Channel Type', value: oldChannel.type === newChannel.type ? `${oldChannel.type}` : `${newChannel.type}`, inline: true },
                { name: 'Channel ID', value: oldChannel.id === newChannel.id ? `${oldChannel.id}` : `${newChannel.id}`, inline: true },
                { name: 'Channel NSFW', value: oldChannel.nsfw === newChannel.nsfw ? `${oldChannel.nsfw}` : `${newChannel.nsfw}`, inline: true },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};
