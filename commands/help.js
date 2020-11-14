const Discord = require('discord.js')
const settings = require('../settings.json')
const servers = require('../arrays/servers')

exports.run = (client, message, params) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    if (!params[0]) {
      embed.setDescription('Help')
      embed.addField('Command List', `[Use ${settings.prefix}help <commandname> for details]`)
      client.commands.map(c => embed.addField(settings.prefix + c.help.name, c.help.description, true))
      return message.channel.send({ embed });
    } else {
      let command = params[0]
      if (client.commands.has(command)) {
        command = client.commands.get(command)
        embed.setDescription(`${command.help.name}`)
        embed.addField('About', `${command.help.description}`)
        embed.addField('Usage', `${command.help.usage}`)
        message.channel.send({ embed })
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
