const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const alertEmbed = require('../embeds/alertEmbed');
  const embed = new Discord.MessageEmbed(alertEmbed);

  const messagecount = parseInt(args.join(' '));
  if(messagecount > 100) {
    embed.setDescription('Maximum 100 messages can be purged at once');
    return message.channel.send({ embed });
  } else if(!messagecount) {
    embed.setDescription('You must include an amount to purge');
    embed.addField('Use like this:', '!purge 50')
    return message.channel.send({ embed });
  } else {
    message.channel.messages.fetch({limit: messagecount})
    .then(messages => message.channel.bulkDelete(messages));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
