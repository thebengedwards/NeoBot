const Discord = require('discord.js')
const settings = require('../settings.json');

module.exports = (client, message) => {
    const alertEmbed = require('../embeds/alertEmbed')
    const embed = new Discord.MessageEmbed(alertEmbed)

    embed.setDescription(`A Message was deleted from ${message.channel}`)
    embed.addField(`Sent by: ${message.author.tag}`, `\'${message.cleanContent}\'`)
    return client.channels.cache.get(settings.mod).send({ embed });
};