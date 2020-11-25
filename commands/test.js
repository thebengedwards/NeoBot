const Discord = require('discord.js')
const fetch = require('node-fetch')
const settings = require('../settings.json')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async(client, message) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  }).then(res => res.json());
  
  if (data.serverID === message.guild.id) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    embed.setDescription('Test')
    embed.addFields(
      { name: 'Speed:', value: `${Date.now() - message.createdTimestamp} ms` },
      { name: 'Powered by:', value: `${settings.host}` }
    )
    return message.channel.send({ embed })
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'Test command. Check if I am online!',
  usage: 'test'
};
