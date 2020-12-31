const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, guild, user) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === guild.id && item.generalChannelID !== '0') {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription(`${user.username} was Unbanned`)
            embed.addField(`For more information please refer to:`, `<@${item.ownerID}>`)
            return client.channels.cache.get(item.generalChannelID).send({ embed });
        }
    })
};
