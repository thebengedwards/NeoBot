const Discord = require("discord.js");
const fetch = require("node-fetch")
const moment = require("moment");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldMember, newMember) => {
    let data = await fetch(`${PATH}/servers/${oldMember.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === oldMember.guild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Member Update')
        embed.addFields(
            { name: 'A Member has been Updated', value: `Details are listed below.` },
            { name: 'Member Username', value: `${newMember.user.username}` },
            { name: 'Member Nickname', value: newMember.nickname !== null ? `${newMember.nickname}` : `No Nickname` },
            { name: 'Member ID', value: `${newMember.user.id}`, inline: true },
            { name: 'Member Since', value: `${moment(newMember.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(newMember.joinedTimestamp).format('HH:mm')}`, inline: true },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
