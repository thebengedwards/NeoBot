const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed');

module.exports = async (client, message) => {
    try {
        if (message.channel.type !== 'dm') {

        }
        let model;
        await GetServer({ serverid: message.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(eventEmbed)

                embed.setDescription(`All Reactions Removed!`)
                embed.addFields(
                    { name: `Message`, value: message.content !== '' ? `${message.content}` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
                    { name: `By`, value: `${message.author.username}` },
                    { name: `In Channel`, value: `${message.channel.name}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};