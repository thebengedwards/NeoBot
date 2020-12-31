const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

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
        if (item.serverID === member.guild.id && item.generalChannelID !== '0') {
            const eventEmbed = require('../embeds/eventEmbed')
            const embed = new Discord.MessageEmbed(eventEmbed)

            embed.setDescription(`${member.user.username} has left the server`)
            embed.addFields(
                { name: 'We shall miss them!', value: `${member.user.username} had been part of this server since ${moment(member.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(member.joinedTimestamp).format('HH:mm')}` },
                { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `Bot: ${member.user.bot ? 'True' : 'False'}` },
            )
            return client.channels.cache.get(item.generalChannelID).send({ embed });
        }
    })
};