const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, channel) => {
    try {
        let model;
        await GetServer({ serverid: channel.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === channel.guild.id && channel.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Channel Deletion')
                embed.addFields(
                    { name: 'A Channel has been Deleted', value: `Details are listed below.` },
                    { name: 'Channel Name', value: `${channel.name}` },
                    { name: 'Channel Topic', value: `${channel.topic ? channel.topic : "None"}` },
                    { name: 'Channel Type', value: `${channel.type}`, inline: true },
                    { name: 'Channel ID', value: `${channel.id}`, inline: true },
                    { name: 'Channel NSFW', value: `${channel.nsfw}`, inline: true },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
};