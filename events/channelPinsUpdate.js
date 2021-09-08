const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed');

module.exports = async (client, channel, time) => {
    try {
        let model;
        if (channel.type !== 'dm') {
            await GetServer({ serverid: channel.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (model.resultItems.serverid === channel.guild.id && channel.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                    const embed = new MessageEmbed(eventEmbed)

                    embed.setDescription('Channel Pins Update')
                    embed.addFields(
                        { name: 'A Channel\'s Pins have been Updated', value: `Details are listed below.` },
                        { name: 'Channel Name', value: `${channel.name}` },
                        { name: 'Channel Topic', value: `${channel.topic}` },
                        { name: 'Channel Type', value: `${channel.type}`, inline: true },
                        { name: 'Channel ID', value: `${channel.id}`, inline: true },
                        { name: 'Pinned Time:', value: `${moment(time).format('Do MMMM YYYY')} at ${moment(time).format('HH:mm')}` },
                    )
                    return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
};
