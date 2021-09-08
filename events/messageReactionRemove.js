const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const pollEmbed = require('../embeds/pollEmbed');

module.exports = async (client, messageReaction, user) => {
    try {
        console.log('message reaction removed')
        if (messageReaction.message.channel.type !== 'dm') {
            let model;
            await GetServer({ serverid: messageReaction.message.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

        }
    } catch (err) {
        console.log(err)
    }
};