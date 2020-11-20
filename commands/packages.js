const Discord = require('discord.js')
const servers = require('../arrays/servers')
const package = require('../package.json')

exports.run = (client, message) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    embed.setDescription('Packages')
    console.log(package.dependencies)
    
    return message.channel.send({ embed })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'log',
  description: 'Logs all the differences between previous versions',
  usage: 'log'
};