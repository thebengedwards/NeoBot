const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldEmoji, newEmoji) => {
    let model;
    await GetServer({ serverid: oldEmoji.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === oldEmoji.guild.id && newEmoji.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Emoji Update')
        embed.addFields(
            { name: 'An Emoji has been updated', value: `Details are listed below.` },
            { name: 'Emoji Name', value: newEmoji.name !== '__' ? `${newEmoji.name}` : `EMPTY - change the name` },
            { name: 'Emoji ID', value: `${newEmoji.id}`, inline: true },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};