const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed')

module.exports = async (client, member) => {
    try {
        let model;
        await GetServer({ serverid: member.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === member.guild.id && member.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(eventEmbed)

                embed.setDescription(`${member.user.username} has joined the server`)
                embed.addFields(
                    { name: 'Remember to update their nickname', value: `Nicknames can enhance your server!` },
                    { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `If !accept has not assigned any roles, check the NeoBot role is above the Member role` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};