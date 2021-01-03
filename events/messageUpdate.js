const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldMessage, newMessage) => {
    let data = await fetch(`${PATH}/servers/${oldMessage.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === oldMessage.guild.id) {
        if (oldMessage.content !== '') {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription(`A Message by <@${oldMessage.author.id}> was just updated`)
            embed.addFields(
                { name: `Old Message:`, value: oldMessage.content !== '' ? `${oldMessage.content}` : `No Text` },
                { name: `Updated Message:`, value: newMessage.content !== '' ? `${newMessage.content}` : `No Text` },
                { name: `This alert is designed to stop spreading misinformation`, value: `Please try to avoid editing messages` },
            )
            return client.channels.cache.get(oldMessage.channel.id).send({ embed });
        }
    }
};