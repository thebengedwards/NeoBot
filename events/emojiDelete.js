const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, emoji) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === emoji.guild.id) {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription('Emoji Deletion')
            embed.addFields(
                { name: 'An Emoji has been deleted', value: `Details are listed below.` },
                { name: 'Emoji Name', value: `${emoji.name}` },
                { name: 'Emoji ID', value: `${emoji.id}` },
                { name: 'Emoji Animated', value: `${emoji.animated}`, inline: true },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};