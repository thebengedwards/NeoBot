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

                embed.setDescription(`New Invite Created by <@${invite.inviter.id}>`)
                embed.addFields(
                    { name: `Invite URL: https://discord.gg/${invite.code}`, value: `Invite valid for: ${invite.maxAge === 0 ? `Unlimited` : invite.maxAge} seconds.` },
                    { name: `Current Members: ${invite.channel.guild.memberCount}`, value: `Maximum Members: ${invite.channel.guild.maximumMembers}` },
                    { name: `Invited Channel: ${invite.channel.name}`, value: `Maximum Uses: ${invite.maxUses === 0 ? `Unlimited` : invite.maxUses}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
};