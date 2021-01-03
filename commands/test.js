const Discord = require("discord.js")
const fetch = require("node-fetch")
const settings = require("../settings.json")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  })
    .then(res => res.json());

  if (data.serverID === message.guild.id) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    embed.setDescription('Test')
    embed.addFields(
      { name: `Hello ${message.author.username}`, value: `🟩 NeoBot is currently Online 🟩` },
      { name: '\u200B', value: `---CURRENT SERVER---` },
      { name: 'Name:', value: `${message.guild.name}`, inline: true },
      { name: 'Members:', value: `${message.guild.memberCount}`, inline: true },
      { name: 'Region:', value: `${message.guild.region}`, inline: true },
      { name: '\u200B', value: `---ABOUT NEOBOT---` },
      { name: 'Active Servers', value: `${client.guilds.cache.size}`, inline: true },
      { name: 'Available Commands:', value: `${client.commands.size}`, inline: true },
      { name: 'Verified:', value: `${client.user.verified}`, inline: true },
      { name: '\u200B', value: `---DATA---` },
      { name: 'Response Speed:', value: `${Date.now() - message.createdTimestamp} ms`, inline: true },
      { name: 'Powered by:', value: `${settings.host}`, inline: true }
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
