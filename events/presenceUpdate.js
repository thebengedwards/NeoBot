const Discord = require("discord.js");
const fetch = require("node-fetch")
const moment = require("moment");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldMember, newMember) => {
    let data = await fetch(`${PATH}/servers/${newMember.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());
    
    let memberStatus;
    if (newMember.status === 'online') {
        memberStatus = '🟩 Online 🟩'
    } else if (newMember.status === 'idle') {
        memberStatus = '🟧 Idle 🟧'
    } else if (newMember.status === 'dnd') {
        memberStatus = '🟥 Do Not Disturb 🟥'
    } else {
        memberStatus = '⬜ Offline ⬜'
    }

    let customPresence;
    if (newMember.activities[0] === undefined) {
        customPresence = 'No custom status'
    } else {
        customPresence = newMember.activities[0].state
    }

    if (data.serverID === newMember.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Presence Update')
        embed.addFields(
            { name: `${newMember.user.username} is now:`, value: `${memberStatus}` },
            { name: `Custom Status:`, value: `${customPresence}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
