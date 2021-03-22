const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, member) => {
    let model;
    await GetServer({ serverid: member.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === member.guild.id && member.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`${member.user.username} has joined the server`)
        embed.addFields(
            { name: 'Remember to update their nickname', value: `Nicknames can enhance your server!` },
            { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `If !accept has not assigned any roles, check the NeoBot role is above the Member role` },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};