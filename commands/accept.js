const Discord = require('discord.js');
const settings = require('../settings.json');
const standardEmbed = require('../embeds/standardEmbed');
const embed = new Discord.MessageEmbed(standardEmbed);

exports.run = (client, message) => {
  const member_role = message.guild.roles.cache.find(name => name.name, settings.memberrolename)
    if(message.member.roles.cache.find(r => r.name === "Member"))
    {
      embed.setTitle('Error');
      embed.setDescription('You already have a role!');
      return message.member.send({ embed });
    } else
    {
      embed.setTitle('Success!');
      embed.setDescription('You have been assigned the role: MEMBER!');
      message.member.addRole(member_role)
      return message.member.send({ embed });
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
  