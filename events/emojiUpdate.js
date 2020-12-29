const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldEmoji, newEmoji) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === oldEmoji.guild.id) {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription('Emoji Update')
            embed.addFields(
                { name: 'An Emoji has been updated', value: `Details are listed below.` },
                { name: 'Emoji Name', value: oldEmoji.name === newEmoji.name ? `${oldEmoji.name}` : `${newEmoji.name}` },
                { name: 'Emoji ID', value: oldEmoji.id === newEmoji.id ? `${oldEmoji.id}` : `${newEmoji.id}`, inline: true },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};