const Discord = require("discord.js");
const fetch = require("node-fetch");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, invite) => {
    let data = await fetch(`${PATH}/servers/${invite.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === invite.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`An Invite was Deleted`)
        embed.addFields(
            { name: `Invite Code: ${invite.code}`, value: `Send new invites to affected users` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};