const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldState, newState) => {
    let model;
    await GetServer({ serverid: newState.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === newState.guild.id && newState.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Voice State Update')
        embed.addFields(
            { name: `User changed Voice State:`, value: `<@${newState.id}>` },
            { name: `Voice Channel`, value: newState.channelID !== null ? `Joined ${newState.guild.channels.cache.find(item => item.id === newState.channelID).name}` : `Left ${oldState.guild.channels.cache.find(item => item.id === oldState.channelID).name}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
