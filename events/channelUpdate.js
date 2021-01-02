const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldChannel, newChannel) => {
    let data = await fetch(`${PATH}/servers/${oldChannel.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === oldChannel.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Channel Update')
        embed.addFields(
            { name: 'A Channel has been Updated', value: `Details are listed below.` },
            { name: 'Channel Name', value: `${newChannel.name}` },
            { name: 'Channel Topic', value: newChannel.topic !== null ? `${newChannel.topic}` : `None yet` },
            { name: 'Channel Type', value: `${newChannel.type}`, inline: true },
            { name: 'Channel ID', value: `${newChannel.id}`, inline: true },
            { name: 'Channel NSFW', value: `${newChannel.nsfw}`, inline: true },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
