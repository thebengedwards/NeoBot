const Discord = require('discord.js')
const giveMeAJoke = require('give-me-a-joke')

exports.run = (client, message) => {
  const commandEmbed = require('../embeds/commandEmbed')
  const embed = new Discord.MessageEmbed(commandEmbed)

  giveMeAJoke.getRandomDadJoke(function(joke)
  {
    embed.setDescription('A Random Joke')
    embed.addField('Here you go:', joke)
    return message.reply({ embed })
  });
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