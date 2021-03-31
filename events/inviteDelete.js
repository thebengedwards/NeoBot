const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, invite) => {
    try {
        let model;
        await GetServer({ serverid: invite.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === invite.guild.id && invite.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription(`An Invite was Deleted`)
                embed.addFields(
                    { name: `Invite Code: ${invite.code}`, value: `Send new invites to affected users` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
};