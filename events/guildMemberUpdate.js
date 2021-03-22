const Discord = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldMember, newMember) => {
    let model;
    await GetServer({serverid: oldMember.guild.id})
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    console.log(model.modchannelid)
    
    if (model.serverid === oldMember.guild.id && newMember.guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Member Update')
        embed.addFields(
            { name: 'A Member has been Updated', value: `Details are listed below.` },
            { name: 'Member Username', value: `${newMember.user.username}` },
            { name: 'Member Nickname', value: newMember.nickname !== null ? `${newMember.nickname}` : `No Nickname` },
            { name: 'Member ID', value: `${newMember.user.id}`, inline: true },
            { name: 'Member Since', value: `${moment(newMember.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(newMember.joinedTimestamp).format('HH:mm')}`, inline: true },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
