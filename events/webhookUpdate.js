const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, channel) => {
    let model;
    await GetServer({ serverid: channel.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === channel.guild.id && channel.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Webhook Update')
        embed.addFields(
            { name: `A Webhook on ${channel.name} has been updated`, value: `Type: ${channel.type}` },
            { name: `Channel ID: ${channel.id}`, value: `Check Audit-Log to see which webhook was updated` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
