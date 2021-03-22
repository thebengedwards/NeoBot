const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, guild, user) => {
    let model;
    await GetServer({ serverid: guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === guild.id && guild.channels.cache.find(item => item.id === model.modchannelid)) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`${user.username} was Unbanned`)
        embed.addField(`For more information please refer to:`, `<@${model.ownerID}>`)
        return client.channels.cache.get(model.generalchannelid).send({ embed });
    }
};
