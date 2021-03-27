const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldChannel, newChannel) => {
    try {
        let model;
        await GetServer({ serverid: oldChannel.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === oldChannel.guild.id && newChannel.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
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
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
};
