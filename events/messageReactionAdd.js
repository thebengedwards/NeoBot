const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, messageReaction, user) => {
    let model;
    await GetServer({ serverid: messageReaction.message.guild.id })
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    addReaction = (prevEmbed, ID) => {
        if (prevEmbed.fields.find(item => item.name === ID).value === 'None') {
            return prevEmbed.fields.find(item => item.name === ID).value = `<@${user.id}>`
        } else {
            return prevEmbed.fields.find(item => item.name === ID).value = `${prevEmbed.fields.find(item => item.name === ID).value} \n <@${user.id}>`
        }
    }

    moveReaction = (prevEmbed, ID) => {
        newValue = prevEmbed.fields.find(item => item.name === ID).value.replace(`<@${user.id}>`, '')
        if (newValue === '') newValue = 'None'
        return prevEmbed.fields.find(item => item.name === ID).value = newValue
    }

    if (model.serverid === messageReaction.message.guild.id) {
        if (user.bot === false && messageReaction.message.author.username === 'NeoBot' && messageReaction.message.embeds[0].title === '**Poll**') {
            let prevEmbed = messageReaction.message.embeds[0]

            if (messageReaction._emoji.name === '👍') {
                if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                    return
                } else {
                    if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                        moveReaction(prevEmbed, 'NO')
                    }
                    addReaction(prevEmbed, 'YES')
                }
            } else if (messageReaction._emoji.name === '👎') {
                if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                    return
                } else {
                    if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                        moveReaction(prevEmbed, 'YES')
                    }
                    addReaction(prevEmbed, 'NO')
                }
            }
            const pollEmbed = require('../embeds/pollEmbed')
            const embed = new Discord.MessageEmbed(pollEmbed)

            embed.setDescription(prevEmbed.description)
            embed.addFields(
                ...prevEmbed.fields
            )

            let message = messageReaction.message
            await message.edit(embed);
        }
    }
};