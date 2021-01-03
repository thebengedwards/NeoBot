const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldRole, newRole) => {
    let data = await fetch(`${PATH}/servers/${oldRole.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === oldRole.guild.id && newRole.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Role Updated')
        embed.addFields(
            { name: 'A Role has been Updated', value: `Details are listed below.` },
            { name: `Role Name: ${newRole.name}`, value: `Role ID: ${newRole.id}` },
            { name: `Permissions Bitfield: ${newRole.permissions.bitfield}`, value: `Priority: ${newRole.rawPosition}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
