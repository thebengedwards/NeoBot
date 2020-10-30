const Discord = require('discord.js')
const settings = require('../settings.json')

exports.run = (client, message) => {
  const alertEmbed = require('../embeds/alertEmbed')
  const embed = new Discord.MessageEmbed(alertEmbed)

  const member_role = message.guild.roles.cache.find(name => name.name, settings.memberrolename)
  if(message.member.roles.cache.find(r => r.name === "Member"))
  {
    embed.setDescription('You already have a role!')
    return message.channel.send({ embed })
  } else {
    message.member.addRole(member_role)
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
  
exports.help = {
  name: 'accept',
  description: 'Add the initial member role to your account!',
  usage: 'accept'
};
  