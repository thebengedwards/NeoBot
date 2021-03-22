const Discord = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, message) => {
    let model;
    await GetServer({ serverid: message.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`A Message was deleted from ${message.channel}`)
        embed.addFields(
            { name: `Sent by: ${message.author.tag}`, value: message.content !== '' ? `${message.content}` : `Embed Type: ${message.embeds[0].title}, Embed Name: ${message.embeds[0].description}` },
            { name: `Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, value: `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};