const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, invite) => {
    let model;
    await GetServer({ serverid: invite.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === invite.guild.id && invite.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`An Invite was Deleted`)
        embed.addFields(
            { name: `Invite Code: ${invite.code}`, value: `Send new invites to affected users` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};