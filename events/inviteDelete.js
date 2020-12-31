const Discord = require("discord.js");
const fetch = require("node-fetch");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, invite) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === invite.guild.id && item.modChannelID !== '0') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription(`An Invite was Deleted`)
            embed.addFields(
                { name: `Invite URL: https://discord.gg/${invite.code}`, value: `Invite valid for: ${invite.maxAge === 0 ? `Unlimited` : invite.maxAge} seconds.` },
                { name: `Current Members: ${invite.channel.guild.memberCount}`, value: `Maximum Members: ${invite.channel.guild.maximumMembers}` },
                { name: `Invited Channel: ${invite.channel.name}`, value: `Maximum Uses: ${invite.maxUses === 0 ? `Unlimited` : invite.maxUses}` },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};