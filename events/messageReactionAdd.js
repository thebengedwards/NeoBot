const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, messageReaction, user) => {
    let data = await fetch(`${PATH}/servers/${messageReaction.message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === messageReaction.message.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`Reaction Added!`)
        embed.addFields(
            { name: `Message`, value: messageReaction.message.content !== '' ? `${messageReaction.message.content}.` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
            { name: `Reaction Added`, value: `${messageReaction._emoji.name}` },
            { name: `Added By`, value: `${user.username}` },
            { name: `In Channel`, value: `${messageReaction.message.channel.name}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};