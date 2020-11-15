const Discord = require('discord.js')
const settings = require('../settings.json')
const servers = require('../arrays/servers')

exports.run = (client, message) => {
  let server = servers.find(item => message.guild.id == item.serverID)
  if (server) {
    if (server.setupComplete) {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Config')
      embed.addField('Completed Setup:', server.setupComplete ? `Complete 🟩` : `Incomplete 🟥`)
      embed.addFields(
        { name: `Admin Role:`, value: server.adminRoleID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Welcome Channel:`, value: server.welcomeChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Weekly Meme`, value: server.weeklyMeme ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Game Updates`, value: server.gameUpdates ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Events`, value: server.events ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Polls`, value: server.polls ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
      )
      return message.channel.send({ embed });
    } else {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Start Config')
      embed.addFields(
        { name: 'Welcome to the NEO setup', value: 'This message will guide you through the setup process' },
        { name: '\u200B', value: '\u200B' },
        { name: 'NEO uses three main roles, Admin, Moderator and Member', value: 'It doesn\'t matter if you have more roles, just assign the roles to any applicable.' },
        { name: 'Assign these roles by using the command command \'!setupRoles <AdminID> <ModeratorID> <MemberID>\'', value: 'Find the role ID\'s by enabling Dev mode in the settings, and then right clicking the role in server settings, and select \'Copy ID\'. If you wish to leave a role empty, use 0.' },
        { name: '\u200B', value: '\u200B' },
        { name: 'NEO can also uses a default of 6 text channels', value: 'It doesn\'t matter if you don\'t have 6 text channels, just assign these to any applicable.' },
        { name: 'Assign these channels by using the command \'!setupChannels <Welcome> <ModeratorOnly> <General> <Memes> <Games> <Updates>\'', value: 'Find the channel ID\'s by enabling Dev mode in the settings, and then right clicking the channel in the server, and select \'Copy ID\'. If you dont have a channel applicable, use 0.' },
        { name: '\u200B', value: '\u200B' },
        { name: 'NEO can also uses a default of 6 text channels', value: 'It doesn\'t matter if you don\'t have 6 text channels, just assign these to any applicable.' },
        { name: 'Assign these channels by using the command \'!setupChannels <Welcome> <ModeratorOnly> <General> <Memes> <Games> <Updates>\'', value: 'Find the channel ID\'s by enabling Dev mode in the settings, and then right clicking the channel in the server, and select \'Copy ID\'. If you dont have a channel applicable, use 0.' },
      )
      return message.channel.send({ embed })
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['c', 'config'],
  permLevel: 3
};

exports.help = {
  name: 'config',
  description: 'Configure Neo',
  usage: 'config'
};
