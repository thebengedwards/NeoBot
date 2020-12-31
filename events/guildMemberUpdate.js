const Discord = require("discord.js");
const fetch = require("node-fetch")
const moment = require("moment");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldMember, newMember) => {
    let data = await fetch(`${PATH}/servers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    data.map(async (item) => {
        if (item.serverID === oldMember.guild.id && item.modChannelID !== '0') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription('Member Update')
            embed.addFields(
                { name: 'A Member has been Updated', value: `Details are listed below.` },
                { name: 'Member Username', value: oldMember.user.username === newMember.user.username ? `${oldMember.user.username}` : `${newMember.user.username}` },
                { name: 'Member Nickname', value: oldMember.nickname === newMember.nickname ? `${oldMember.nickname}` : `${newMember.nickname}`},
                { name: 'Member ID', value: oldMember.user.id === newMember.user.id ? `${oldMember.user.id}` : `${newMember.user.id}`, inline: true },
                { name: 'Member Since', value: `${moment(oldMember.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(oldMember.joinedTimestamp).format('HH:mm')}`, inline: true },
            )
            return client.channels.cache.get(item.modChannelID).send({ embed });
        }
    })
};
