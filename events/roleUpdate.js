const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed');

module.exports = async (client, oldRole, newRole) => {
    try {
        let model;
        await GetServer({ serverid: oldRole.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === oldRole.guild.id && newRole.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(eventEmbed)

                embed.setDescription('Role Updated')
                embed.addFields(
                    { name: 'A Role has been Updated', value: `Details are listed below.` },
                    { name: `Role Name: ${newRole.name}`, value: `Role ID: ${newRole.id}` },
                    { name: `Permissions Bitfield: ${newRole.permissions.bitfield}`, value: `Priority: ${newRole.rawPosition}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};
