const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, guild, user) => {
    try {
        let model;
        await GetServer({ serverid: guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === guild.id && guild.channels.cache.find(item => item.id === model.resultItems.generalchannelid)) {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${user.username} was Banned`)
                embed.addField(`For the reason of the ban, please refer to:`, `<@${model.resultItems.ownerid}>`)
                return client.channels.cache.get(model.resultItems.generalchannelid).send({ embed });
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
};
