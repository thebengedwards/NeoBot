const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed');

module.exports = async (client, oldChannel, newChannel) => {
    try {
        let model;
        if (oldChannel.type !== 'dm') {
            await GetServer({ serverid: oldChannel.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (model.resultItems.serverid === oldChannel.guild.id && newChannel.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                    const embed = new MessageEmbed(eventEmbed)

                    embed.setDescription('Channel Update')
                    embed.addFields(
                        { name: 'A Channel has been Updated', value: `Details are listed below.` },
                        { name: 'Channel Name', value: `${newChannel.name}` },
                        { name: 'Channel Topic', value: newChannel.topic !== null ? `${newChannel.topic}` : `None yet` },
                        { name: 'Channel Type', value: `${newChannel.type}`, inline: true },
                        { name: 'Channel ID', value: `${newChannel.id}`, inline: true },
                        { name: 'Channel NSFW', value: `${newChannel.nsfw}`, inline: true },
                    )
                    return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
};
