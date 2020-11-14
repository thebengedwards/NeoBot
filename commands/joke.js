const Discord = require('discord.js')
const giveMeAJoke = require('give-me-a-joke')
const servers = require('../arrays/servers')

exports.run = (client, message) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    giveMeAJoke.getRandomDadJoke(function (joke) {
      embed.setDescription('A Random Joke')
      embed.addField('Here you go:', joke)
      return message.reply({ embed })
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'joke',
  description: 'Makes me tell you a joke',
  usage: 'joke'
};