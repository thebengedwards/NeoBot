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

    if (data.serverID === role.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Role Deletion')
        embed.addFields(
            { name: 'A Role has been Deleted', value: `Details are listed below.` },
            { name: `Role Name: ${role.name}`, value: `Role ID: ${role.id}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};