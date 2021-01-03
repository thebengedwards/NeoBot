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

    if (data.serverID === messageReaction.message.guild.id && messageReaction.message.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`Reaction Removed!`)
        embed.addFields(
            { name: `Message`, value: messageReaction.message.content !== '' ? `${messageReaction.message.content}.` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
            { name: `Reaction Removed`, value: `${messageReaction._emoji.name}` },
            { name: `Removed By`, value: `${user.username}` },
            { name: `In Channel`, value: `${messageReaction.message.channel.name}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};