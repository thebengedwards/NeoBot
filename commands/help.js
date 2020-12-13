const Discord = require('discord.js')
const fetch = require('node-fetch')
const settings = require('../settings.json')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async(client, message, args) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  }).then(res => res.json());
  
  if (data.serverID === message.guild.id) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    if (!args[0]) {
      embed.setDescription('Help')
      embed.addField('Command List', `[Use ${settings.prefix}help <commandname> for details]`)
      client.commands.map(item => {if(item.conf.permLevel < 3){embed.addField(settings.prefix + item.help.name, item.help.description, true)}})
      return message.channel.send({ embed });
    } else {
      let command = args[0]
      if (client.commands.has(command)) {
        command = client.commands.get(command)
        embed.setDescription(`${command.help.name}`)
        embed.addField('About', `${command.help.description}`)
        embed.addField('Usage', `${command.help.usage}`)
        return message.channel.send({ embed })
      }
    }
  } else {
    console.log('Error')
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