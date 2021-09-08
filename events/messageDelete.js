const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");
const profanities = require('profanities');
const alertEmbed = require('../components/embeds/alertEmbed');

module.exports = async (client, message) => {
    try {
        let messageItems = message.content.split(" ");
        if (profanities.some(index => messageItems.indexOf(index) >= 0)) return;
        if (message.channel.type !== 'dm') {
            let model;
            await GetServer({ serverid: message.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (model.resultItems.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                    const embed = new MessageEmbed(alertEmbed)

                    embed.setDescription(`A Message was deleted from ${message.channel}`)
                    embed.addFields(
                        { name: `Sent by: ${message.author.tag}`, value: message.content !== '' ? `${message.content}` : `Embed Type: ${message.embeds[0].title}, Embed Name: ${message.embeds[0].description}` },
                        { name: `Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, value: `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}` },
                    )
                    return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
};