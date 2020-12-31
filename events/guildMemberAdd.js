const Discord = require("discord.js");
const fetch = require("node-fetch");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, member) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === member.guild.id && item.modChannelID !== '0') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription(`${member.user.username} has joined the server`)
            embed.addFields(
                { name: 'Remember to update their nickname', value: `Nicknames can enhance your server!` },
                { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `If !accept has not assigned any roles, check the NeoBot role is above the Member role` },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};