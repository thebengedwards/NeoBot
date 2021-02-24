const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")

exports.run = async (client, message) => {
  let server
  await GetServer(message.guild.id)
    .then(res => server = res.data)
    .catch((err) => { console.log('GetServer Error') });

  if (message.member.roles.cache.find(item => item.name === "Member")) {
    const alertEmbed = require('../embeds/alertEmbed')
    const embed = new Discord.MessageEmbed(alertEmbed)

    embed.setDescription('You already have a role!')
    return message.channel.send({ embed })
  } else {
    if (server.serverID === message.guild.id && message.guild.channels.cache.find(item => item.id === server.generalChannelID)) {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription(`Please welcome ${message.member} to the server!`)
      message.member.roles.add(server.memberRoleID)
      return client.channels.cache.get(server.generalChannelID).send({ embed });
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
