const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const alertEmbed = require('../components/embeds/alertEmbed');

module.exports = async (client, guild, user) => {
    try {
        let model;
        await GetServer({ serverid: guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === guild.id && guild.channels.cache.find(item => item.id === model.resultItems.generalchannelid)) {
                const embed = new MessageEmbed(alertEmbed)

                embed.setDescription(`${user.username} was Unbanned`)
                embed.addFields(
                    { name: 'For more information please refer to:', value: `<@${model.resultItems.ownerid}>` },
                )
                return client.channels.cache.get(model.resultItems.generalchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};
