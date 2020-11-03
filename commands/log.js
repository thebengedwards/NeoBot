const Discord = require('discord.js')

exports.run = (client, message) => {
  const commandEmbed = require('../embeds/commandEmbed')
  const embed = new Discord.MessageEmbed(commandEmbed)

  embed.setDescription('Log')
  embed.addFields(
    { name: 'Version 1.0.0', value: 'Birthday reminders, Jokes, Meme of the day and General Mod Tools.' },
    { name: 'Version 1.0.1', value: 'Fixed Birthday Bug.' },
    { name: 'Version 1.0.2', value: 'Temporarily removed \'Meme of the day\' as it was not working as intended.' },
    { name: 'Version 1.1.0', value: 'Added Version Log, Role Assignment Functionality, Version Status, Fixed Daily Meme, Fixed Jokes, changed prefix from \'~\' to \'!\'.' },
    { name: 'Version 1.1.1', value: 'Minor Bug Fixes.' },
    { name: 'Version 1.1.2', value: 'Moved Host from Glitch to HEROKU.' },
    { name: 'Version 1.1.3', value: 'Added new dates to NEO\'s calendar, Backend stability fixes.' },
    { name: 'Version 1.1.4', value: 'Fixed Birthday Announcements.' },
    { name: 'Version 2.0.0', value: 'Major \'Under-the-hood\' improvements, New Discord Embeds, Added security, Many minor Bug Fixes, \'Weekly Meme\' Imgur mp4 bug fix, Polling' },
  )
  return message.channel.send({ embed })
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