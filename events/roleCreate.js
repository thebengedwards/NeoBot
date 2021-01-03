const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, role) => {
    let data = await fetch(`${PATH}/servers/${role.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === role.guild.id && role.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Role Creation')
        embed.addFields(
            { name: 'A Role has been Created', value: `Details are listed below.` },
            { name: `Role Name: ${role.name}`, value: `Role ID: ${role.id}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
