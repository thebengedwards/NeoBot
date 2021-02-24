const Discord = require("discord.js")
const { GetServer, UpdateServer } = require("../functions/http-functions/servers")

exports.run = async (client, message) => {
  let server
  await GetServer(message.guild.id)
    .then(res => server = res.data)
    .catch((err) => { console.log('GetServer Error') });

  if (server.serverID === message.guild.id) {
    if (server.setupComplete === 1) {

      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Config')
      embed.addField('Completed Setup:', server.setupComplete === 1 ? `Complete 🟩` : `Incomplete 🟥`)
      embed.addFields(
        { name: '\u200B', value: '---ROLES---' },
        { name: `Role Settings`, value: 'Please set the Roles in order to use NeoBot' },
        { name: `Admin Role:`, value: server.adminRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Role:`, value: server.modRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Member Role:`, value: server.memberRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '---CHANNELS---' },
        { name: `Channel Settings`, value: 'Please set the Channels in order to use NeoBot' },
        { name: `Welcome Channel:`, value: server.welcomeChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Channel:`, value: server.modChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `General Channel:`, value: server.generalChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Memes Channel:`, value: server.memesChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Game Updates Channel:`, value: server.gameUpdatesChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Update Log Channel:`, value: server.updateLogChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '---FEATURES---' },
        { name: `Events Settings`, value: 'What features are enabled/disabled' },
        { name: `Weekly Meme`, value: server.weeklyMeme === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Birthdays`, value: server.birthdays === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Calendar`, value: server.calendar === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Game Polls`, value: server.polls === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
      )
      return message.channel.send({ embed });
    } else if (server.setupComplete === 0) {

      const body = {
        serverName: server.serverName,
        setupComplete: true,
        adminRoleID: server.adminRoleID,
        modRoleID: server.modRoleID,
        memberRoleID: server.memberRoleID,
        welcomeChannelID: server.welcomeChannelID,
        modChannelID: server.modChannelID,
        generalChannelID: server.generalChannelID,
        memesChannelID: server.memesChannelID,
        gameUpdatesChannelID: server.gameUpdatesChannelID,
        updateLogChannelID: server.updateLogChannelID,
        weeklyMeme: server.weeklyMeme,
        birthdays: server.birthdays,
        calendar: server.calendar,
        polls: server.polls,
      }

      let server
      await UpdateServer(server.serverID, body)
        .then(res => server = res.data)
        .catch((err) => { console.log('UpdateServer Error') });

      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Start Config')
      embed.addFields(
        { name: 'Welcome to the NeoBot setup', value: 'This message will guide you through the setup process' },
        { name: '\u200B', value: '---ROLES---' },
        { name: 'NeoBot uses three main roles, Admin, Moderator and Member', value: 'It doesn\'t matter if you have more roles, just assign the roles to any applicable.' },
        { name: 'Assign these roles by using the command command \'!setAdminID <AdminID>\', \'!setModID <ModID>\', \'!setMemberID <MemberID>\'', value: 'Find the role ID\'s by enabling Dev mode in the settings, and then right clicking the role in server settings, and select \'Copy ID\'. If you wish to reset a role once set, use 0. Use \'!helpRoles\' for more information.' },
        { name: '\u200B', value: '---CHANNELS---' },
        { name: 'NeoBot can also use a default of 6 text channels', value: 'It doesn\'t matter if you don\'t have 6 text channels, just assign these to any applicable.' },
        { name: 'Assign these channels by using the command \'!setWelcomeChannel <ChannelID>\', \'!setModChannel <ChannelID>\', \'!setGeneralChannel <ChannelID>\', \'!setMemesChannel <ChannelID>\', \'!setGameChannel <ChannelID>\', \'!setUpdateChannel <ChannelID>\',', value: 'Find the channel ID\'s by enabling Dev mode in the settings, and then right clicking the channel in the server, and select \'Copy ID\'. If you dont have a channel applicable, use 0. Use \'!helpChannels\' for more information.' },
        { name: '\u200B', value: '---FEATURES---' },
        { name: 'NeoBot also gives you the option to enable or disable certain features', value: 'These can be enabled or disabled at any point' },
        { name: 'Toggle these features by using \'!toggleWeeklyMemes\',\'!toggleBirthdays\',\'!toggleCalendar\' and \'!togglePolls\'', value: 'These options are either on or off. Use \'!helpEvents\' for more information.' },
        { name: '\u200B', value: '⚠️ ---IMPORTANT--- ⚠️' },
        { name: 'Please also move the automatic NeoBot role to either the top or just below the admin role of the roles list', value: 'This is to allow for the roles functions to work properly.' },
        { name: '\u200B', value: '---SERVER TEMPLATE---' },
        { name: "A server template is available", value: "Create new server [here](https://discord.new/wGdyZgK4efpq)." },
        { name: '\u200B', value: '---DO NOT DELETE---' },
        { name: '⚠️ PLEASE DO NOT DELETE THIS MESSAGE ⚠️', value: 'It can only appear once, and is intended to help you set up NeoBot. It should be pinned, or copied.' },
      )
      return message.channel.send({ embed })
    } else {
      console.log('Error 003')
    }
  } else {
    console.log('Error 002')
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
