const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  }).then(res => res.json());

  if (data.serverID === message.guild.id) {
    if (message.member.roles.cache.find(r => r.name === "Member")) {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription('You already have a role!')
      return message.channel.send({ embed })
    } else {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription(`Please welcome ${message.member} to the server!`)
      message.member.roles.add(data.memberRoleID)
      message.channel.messages.fetch({ limit: 1 })
        .then(messages => message.channel.bulkDelete(messages));
      return client.channels.cache.get(data.generalChannelID).send({ embed });
    }
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
