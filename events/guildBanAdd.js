const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, guild, user) => {
    let data = await fetch(`${PATH}/servers/${guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === guild.id && guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`${user.username} was Banned`)
        embed.addField(`For the reason of the ban, please refer to:`, `<@${data.ownerID}>`)
        return client.channels.cache.get(data.generalChannelID).send({ embed });
    }
};
