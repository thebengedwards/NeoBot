const Discord = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, channel, time) => {
    let model;
    await GetServer({ serverid: channel.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === channel.guild.id && channel.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Channel Pins Update')
        embed.addFields(
            { name: 'A Channel\'s Pins have been Updated', value: `Details are listed below.` },
            { name: 'Channel Name', value: `${channel.name}` },
            { name: 'Channel Topic', value: `${channel.topic}` },
            { name: 'Channel Type', value: `${channel.type}`, inline: true },
            { name: 'Channel ID', value: `${channel.id}`, inline: true },
            { name: 'Pinned Time:', value: `${moment(time).format('Do MMMM YYYY')} at ${moment(time).format('HH:mm')}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
