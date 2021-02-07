const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, messageReaction, user) => {
    let data = await fetch(`${PATH}/servers/${messageReaction.message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    // Reactions to NeoBot Polls
    if (data.serverID === messageReaction.message.guild.id) {
        if (user.bot === false && messageReaction.message.author.username === 'NeoBot' && messageReaction.message.embeds[0].title === '**Poll**') {
            let prevEmbed = messageReaction.message.embeds[0]

            if (messageReaction._emoji.name === '👍') {
                if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                    return
                } else {
                    if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                        newValue = prevEmbed.fields.find(item => item.name === 'NO').value.replace(`<@${user.id}>`, '')
                        if (newValue === '') newValue = 'None'
                        prevEmbed.fields.find(item => item.name === 'NO').value = newValue
                    }
                    if (prevEmbed.fields.find(item => item.name === 'YES').value === 'None') {
                        prevEmbed.fields.find(item => item.name === 'YES').value = `<@${user.id}>`
                    } else {
                        prevEmbed.fields.find(item => item.name === 'YES').value = `${prevEmbed.fields.find(item => item.name === 'YES').value} \n <@${user.id}>`
                    }
                }
            } else if (messageReaction._emoji.name === '👎') {
                if (prevEmbed.fields.find(item => item.name === 'NO').value.includes(`<@${user.id}>`)) {
                    return
                } else {
                    if (prevEmbed.fields.find(item => item.name === 'YES').value.includes(`<@${user.id}>`)) {
                        newValue = prevEmbed.fields.find(item => item.name === 'YES').value.replace(`<@${user.id}>`, '')
                        if (newValue === '') newValue = 'None'
                        prevEmbed.fields.find(item => item.name === 'YES').value = newValue
                    }
                    if (prevEmbed.fields.find(item => item.name === 'NO').value === 'None') {
                        prevEmbed.fields.find(item => item.name === 'NO').value = `<@${user.id}>`
                    } else {
                        prevEmbed.fields.find(item => item.name === 'NO').value = `${prevEmbed.fields.find(item => item.name === 'NO').value} \n <@${user.id}>`
                    }
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

    // if (data.serverID === messageReaction.message.guild.id && messageReaction.message.guild.channels.cache.find(item => item.id === data.modChannelID)) {
    //     const eventEmbed = require('../embeds/eventEmbed')
    //     const embed = new Discord.MessageEmbed(eventEmbed)

    //     embed.setDescription(`Reaction Added!`)
    //     embed.addFields(
    //         { name: `Message`, value: messageReaction.message.content !== '' ? `${messageReaction.message.content}.` : `Embed Type: ${messageReaction.message.embeds[0].title}, Embed Name: ${messageReaction.message.embeds[0].description}` },
    //         { name: `Reaction Added`, value: `${messageReaction._emoji.name}` },
    //         { name: `Added By`, value: `${user.username}` },
    //         { name: `In Channel`, value: `${messageReaction.message.channel.name}` },
    //     )
    //     return client.channels.cache.get(data.modChannelID).send({ embed });
    // }
};