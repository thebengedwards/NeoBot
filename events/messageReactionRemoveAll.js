const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, message) => {
    let model;
    await GetServer({ serverid: message.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`All Reactions Removed!`)
        embed.addFields(
            { name: `Message`, value: message.content !== '' ? `${message.content}` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
            { name: `By`, value: `${message.author.username}` },
            { name: `In Channel`, value: `${message.channel.name}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};