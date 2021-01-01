const Discord = require("discord.js")
const fetch = require("node-fetch")

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
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`All Reactions Removed!`)
        embed.addFields(
            { name: `Message`, value: message.content !== '' ? `${message.content}.` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
            { name: `By`, value: `${message.author.username}` },
            { name: `In Channel`, value: `${message.channel.name}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};