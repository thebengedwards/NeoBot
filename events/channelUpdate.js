const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldChannel, newChannel) => {
    let model;
    await GetServer({ serverid: oldChannel.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === oldChannel.guild.id && channel.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Channel Update')
        embed.addFields(
            { name: 'A Channel has been Updated', value: `Details are listed below.` },
            { name: 'Channel Name', value: `${newChannel.name}` },
            { name: 'Channel Topic', value: newChannel.topic !== null ? `${newChannel.topic}` : `None yet` },
            { name: 'Channel Type', value: `${newChannel.type}`, inline: true },
            { name: 'Channel ID', value: `${newChannel.id}`, inline: true },
            { name: 'Channel NSFW', value: `${newChannel.nsfw}`, inline: true },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
