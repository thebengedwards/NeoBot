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

    if (data.serverID === invite.guild.id && invite.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`New Invite Created by <@${invite.inviter.id}>`)
        embed.addFields(
            { name: `Invite URL: https://discord.gg/${invite.code}`, value: `Invite valid for: ${invite.maxAge === 0 ? `Unlimited` : invite.maxAge} seconds.` },
            { name: `Current Members: ${invite.channel.guild.memberCount}`, value: `Maximum Members: ${invite.channel.guild.maximumMembers}` },
            { name: `Invited Channel: ${invite.channel.name}`, value: `Maximum Uses: ${invite.maxUses === 0 ? `Unlimited` : invite.maxUses}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};