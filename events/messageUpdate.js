const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldMessage, newMessage) => {
    let model;
    await GetServer({ serverid: oldMessage.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === oldMessage.guild.id) {
        if (oldMessage.content !== '') {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription(`A Message by <@${oldMessage.author.id}> was just updated`)
            embed.addFields(
                { name: `Old Message:`, value: oldMessage.content !== '' ? `${oldMessage.content}` : `No Text` },
                { name: `Updated Message:`, value: newMessage.content !== '' ? `${newMessage.content}` : `No Text` },
                { name: `This alert is designed to stop spreading misinformation`, value: `Please try to avoid editing messages` },
            )
            return client.channels.cache.get(oldMessage.channel.id).send({ embed });
        }
    }
};