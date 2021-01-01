const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, channel, time) => {
    let data = await fetch(`${PATH}/servers/${channel.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === channel.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Channel Pins Update')
        embed.addFields(
            { name: 'A Channel\'s Pins have been Updated', value: `Details are listed below.` },
            { name: 'Channel Name', value: `${channel.name}` },
            { name: 'Channel Topic', value: `${channel.topic}` },
            { name: 'Channel Type', value: `${channel.type}`, inline: true },
            { name: 'Channel ID', value: `${channel.id}`, inline: true },
            { name: 'Pinned Time:', value: `${moment(time).format('Do MMMM YYYY')} at ${moment(time).format('HH:mm')}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
