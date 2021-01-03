const Discord = require("discord.js")
const fetch = require("node-fetch");
const settings = require("../settings.json");

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, message) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  })
    .then(res => res.json());

  if (data.serverID === message.guild.id) {
    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return;
    if (message.member === null) {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription('Please only send me messages in servers')
      return message.channel.send({ embed })
    }
    const command = message.content.split(' ')[0].slice(settings.prefix.length);
    const params = message.content.split(' ').slice(1);
    const perms = await client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription('You do not have permission to use this command')
        return message.channel.send({ embed })
      } else {
        cmd.run(client, message, params, perms);
      }
    }
  }
};
