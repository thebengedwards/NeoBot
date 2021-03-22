const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldRole, newRole) => {
    let model;
    await GetServer({ serverid: oldRole.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === oldRole.guild.id && newRole.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Role Updated')
        embed.addFields(
            { name: 'A Role has been Updated', value: `Details are listed below.` },
            { name: `Role Name: ${newRole.name}`, value: `Role ID: ${newRole.id}` },
            { name: `Permissions Bitfield: ${newRole.permissions.bitfield}`, value: `Priority: ${newRole.rawPosition}` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
