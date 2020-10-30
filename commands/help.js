const Discord = require('discord.js')
const settings = require('../settings.json')

exports.run = (client, message, params) => {
  const commandEmbed = require('../embeds/commandEmbed')
  const embed = new Discord.MessageEmbed(commandEmbed)
  
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys())
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)

    embed.setTitle('Help')
    embed.setDescription('Hello, I\'m NEO, the assistant for this discord server. I am used for mainly admin tools, but i do also have some availible user commands.')
    embed.addField('Command List', `[Use ${settings.prefix}help <commandname> for details]`)
    client.commands.map(c => embed.addField(settings.prefix + c.help.name, c.help.description, true))
    message.channel.send({ embed });
  } else {
    let command = params[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      embed.setTitle(`${command.help.name}`)
      embed.setDescription(`${command.help.description}`)
      embed.addField('Usage', `${command.help.usage}`)
      message.channel.send({ embed })
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
