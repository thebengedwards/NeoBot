const Discord = require('discord.js')
const servers = require('../arrays/servers')

exports.run = (client, message) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    if (message.member.roles.cache.find(r => r.name === "Member")) {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription('You already have a role!')
      return message.channel.send({ embed })
    } else {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription(`Please welcome ${message.member} to the server!`)
      message.member.roles.add(server.memberRoleID)
      message.channel.messages.fetch({ limit: 1 })
        .then(messages => message.channel.bulkDelete(messages));
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
