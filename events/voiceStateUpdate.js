const Discord = require("discord.js");
const fetch = require("node-fetch")
const moment = require("moment");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldState, newState) => {
    let data = await fetch(`${PATH}/servers/${newState.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === newState.guild.id && newState.guild.channels.cache.find(item => item.id === data.modChannelID)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Voice State Update')
        embed.addFields(
            { name: `User changed Voice State:`, value: `<@${newState.id}>` },
            { name: `Voice Channel`, value: newState.channelID !== null ? `Joined ${newState.guild.channels.cache.find(item => item.id === newState.channelID).name}` : `Left ${oldState.guild.channels.cache.find(item => item.id === oldState.channelID).name}` },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
