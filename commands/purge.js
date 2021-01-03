const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  })
    .then(res => res.json());

  if (data.serverID === message.guild.id) {
    const alertEmbed = require('../embeds/alertEmbed');
    const embed = new Discord.MessageEmbed(alertEmbed);

    const messagecount = parseInt(args.join(' '));
    if (messagecount > 100) {
      embed.setDescription('Maximum 100 messages can be purged at once');
      return message.channel.send({ embed });
    } else if (!messagecount) {
      embed.setDescription('You must include an amount to purge');
      embed.addField('Use like this:', '!purge 50')
      return message.channel.send({ embed });
    } else {
      message.channel.messages.fetch({ limit: messagecount })
        .then(messages => message.channel.bulkDelete(messages));
    }
  } else {
    console.log('Error')
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
