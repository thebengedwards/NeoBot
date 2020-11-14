const Discord = require('discord.js')
const servers = require('../arrays/servers')

module.exports = (client, message) => {
    let server = servers.find(item => message.guild.id == item.serverID)
    if (server) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`A Message was deleted from ${message.channel}`)
        embed.addField(`Sent by: ${message.author.tag}`, `\'${message.cleanContent}\'`)
        return client.channels.cache.get(server.modChannelID).send({ embed });
    }
};