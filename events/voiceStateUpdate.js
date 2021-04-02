const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldState, newState) => {
    try {
        let model;
        await GetServer({ serverid: newState.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === newState.guild.id && newState.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Voice State Update')
                embed.addFields(
                    { name: `User changed Voice State:`, value: `<@${newState.id}>` },
                    { name: `Voice Channel`, value: newState.channelID !== null ? `Joined ${newState.guild.channels.cache.find(item => item.id === newState.channelID).name}` : `Left ${oldState.guild.channels.cache.find(item => item.id === oldState.channelID).name}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch (err) {
        console.log(err)
    }
};
