const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, channel, user) => {
    let model;
    await GetServer({ serverid: channel.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === channel.guild.id && channel.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Started Typing')
        embed.addFields(
            { name: `${user.username} started typing`, value: `In Channel: ${channel.name}` },
            { name: `Channel ID: ${channel.id}`, value: `Channel NSFW: ${channel.nsfw}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};