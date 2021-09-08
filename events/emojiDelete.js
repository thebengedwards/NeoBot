const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const eventEmbed = require('../components/embeds/eventEmbed');

module.exports = async (client, emoji) => {
    try {
        let model;
        await GetServer({ serverid: emoji.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.serverid === emoji.guild.id && emoji.guild.channels.cache.find(item => item.id === model.modchannelid)) {
                const embed = new MessageEmbed(eventEmbed)

                embed.setDescription('Emoji Deletion')
                embed.addFields(
                    { name: 'An Emoji has been deleted', value: `Details are listed below.` },
                    { name: 'Emoji Name', value: `${emoji.name}` },
                    { name: 'Emoji ID', value: `${emoji.id}` },
                    { name: 'Emoji Animated', value: `${emoji.animated}`, inline: true },
                )
                return client.channels.cache.get(model.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};