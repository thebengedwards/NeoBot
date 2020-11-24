const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = (client, message, args) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    const messageText = args.join(' ');
    if (messageText) {
      const reportEmbed = require('../embeds/reportEmbed');
      const embed = new Discord.MessageEmbed(reportEmbed);

      embed.setDescription(`New Report`)
      embed.addFields(
        { name: 'Report By:', value: `${message.author.tag}` },
        { name: 'Report:', value: `${messageText}` },
        { name: 'Please handle this report with care!', value: 'If it contains sensitive information please be professional' },
      )

      return client.users.fetch(settings.reportid, false).then((user) => {
        user.send({ embed });
      });
    } else {
      const alertEmbed = require('../embeds/alertEmbed');
      const embed = new Discord.MessageEmbed(alertEmbed);

      embed.setDescription('Incorrect usage of report');
      embed.addField('Use like this:', '!report <Text Here>');
      return message.channel.send({ embed });
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'report',
  description: 'Report any issues or feedback! Just send NEO a Direct Message with !report',
  usage: 'report <text here>'
};
