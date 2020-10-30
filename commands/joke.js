const Discord = require('discord.js');
const giveMeAJoke = require('give-me-a-joke');

exports.run = (client, message) => {
  const standardEmbed = require('../embeds/standardEmbed');
  const embed = new Discord.MessageEmbed(standardEmbed);

  giveMeAJoke.getRandomDadJoke(function(joke)
  {
    embed.setTitle('Joke');
    embed.setDescription(joke);
    return message.reply({ embed });
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