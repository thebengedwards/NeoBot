const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, member) => {
    let model;
    await GetServer({ serverid: member.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === member.guild.id && member.guild.channels.cache.find(item => item.id === model.generalchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription(`${member.user.username} has left the server`)
        embed.addFields(
            { name: 'We shall miss them!', value: `${member.user.username} had been part of this server since ${moment(member.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(member.joinedTimestamp).format('HH:mm')}` },
            { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `Bot: ${member.user.bot ? 'True' : 'False'}` },
        )
        return client.channels.cache.get(model.generalchannelid).send({ embed });
    }
};