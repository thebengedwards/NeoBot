const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const alertEmbed = require('../components/embeds/alertEmbed');

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (oldMessage.channel.type !== 'dm') {
            let model;
            await GetServer({ serverid: oldMessage.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (oldMessage.content !== '') {
                    const embed = new MessageEmbed(alertEmbed)

                    embed.setDescription(`A Message by <@${oldMessage.author.id}> was just updated`)
                    embed.addFields(
                        { name: `Old Message:`, value: oldMessage.content !== '' ? `${oldMessage.content}` : `No Text` },
                        { name: `Updated Message:`, value: newMessage.content !== '' ? `${newMessage.content}` : `No Text` },
                        { name: `This alert is designed to stop spreading misinformation`, value: `Please try to avoid editing messages` },
                    )
                    return client.channels.cache.get(oldMessage.channel.id).send({ embeds: [embed] });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
};