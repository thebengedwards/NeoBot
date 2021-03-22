const Discord = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, messages) => {
    let message = messages.find(item => item.content.startsWith('!purge'))

    let model;
    await GetServer({ serverid: message.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`Purge detected in chanel: ${message.channel.name}`)
        embed.addFields(
            { name: `Purged by: ${message.author.username}`, value: `Messages Deleted: ${messages.size}` },
            { name: `Deleted Date: ${moment(new Date()).format('Do MMMM YYYY')}`, value: `Deleted Time: ${moment(new Date()).format('HH:mm:ss')}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};