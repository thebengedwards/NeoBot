const Discord = require("discord.js")
const fetch = require("node-fetch")

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
    if (data.setupComplete === 1) {

      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Config')
      embed.addField('Completed Setup:', data.setupComplete === 1 ? `Complete 🟩` : `Incomplete 🟥`)
      embed.addFields(
        { name: '\u200B', value: '---ROLES---' },
        { name: `Role Settings`, value: 'Please set the Roles in order to use NEO' },
        { name: `Admin Role:`, value: data.adminRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Role:`, value: data.modRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Member Role:`, value: data.memberRoleID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '---CHANNELS---' },
        { name: `Channel Settings`, value: 'Please set the Channels in order to use NEO' },
        { name: `Welcome Channel:`, value: data.welcomeChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Channel:`, value: data.modChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `General Channel:`, value: data.generalChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Memes Channel:`, value: data.memesChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Game Updates Channel:`, value: data.gameUpdatesChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Update Log Channel:`, value: data.updateLogChannelID !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '---FEATURES---' },
        { name: `Events Settings`, value: 'What features are enabled/disabled' },
        { name: `Weekly Meme`, value: data.weeklyMeme === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Birthdays`, value: data.birthdays === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Calendar`, value: data.calendar === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Game Polls`, value: data.polls === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
      )
      return message.channel.send({ embed });
    } else if (data.setupComplete === 0) {

      const body = {
        serverName: data.serverName,
        setupComplete: true,
        adminRoleID: data.adminRoleID,
        modRoleID: data.modRoleID,
        memberRoleID: data.memberRoleID,
        welcomeChannelID: data.welcomeChannelID,
        modChannelID: data.modChannelID,
        generalChannelID: data.generalChannelID,
        memesChannelID: data.memesChannelID,
        gameUpdatesChannelID: data.gameUpdatesChannelID,
        updateLogChannelID: data.updateLogChannelID,
        weeklyMeme: data.weeklyMeme,
        birthdays: data.birthdays,
        calendar: data.calendar,
        polls: data.polls,
      }
      fetch(`${PATH}/servers/${data.serverID}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'API_KEY': KEY
        },
      })
        .then(res => res.json())

      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Start Config')
      embed.addFields(
        { name: 'Welcome to the NEO setup', value: 'This message will guide you through the setup process' },
        { name: '\u200B', value: '---ROLES---' },
        { name: 'NEO uses three main roles, Admin, Moderator and Member', value: 'It doesn\'t matter if you have more roles, just assign the roles to any applicable.' },
        { name: 'Assign these roles by using the command command \'!setAdminID <AdminID>\', \'!setModID <ModID>\', \'!setMemberID <MemberID>\'', value: 'Find the role ID\'s by enabling Dev mode in the settings, and then right clicking the role in server settings, and select \'Copy ID\'. If you wish to reset a role once set, use 0. Use \'!helpRoles\' for more information.' },
        { name: '\u200B', value: '---CHANNELS---' },
        { name: 'NEO can also use a default of 6 text channels', value: 'It doesn\'t matter if you don\'t have 6 text channels, just assign these to any applicable.' },
        { name: 'Assign these channels by using the command \'!setWelcomeChannel <ChannelID>\', \'!setModChannel <ChannelID>\', \'!setGeneralChannel <ChannelID>\', \'!setMemesChannel <ChannelID>\', \'!setGameChannel <ChannelID>\', \'!setUpdateChannel <ChannelID>\',', value: 'Find the channel ID\'s by enabling Dev mode in the settings, and then right clicking the channel in the server, and select \'Copy ID\'. If you dont have a channel applicable, use 0. Use \'!helpChannels\' for more information.' },
        { name: '\u200B', value: '---FEATURES---' },
        { name: 'NEO also gives you the option to enable or disable certain features', value: 'These can be enabled or disabled at any point' },
        { name: 'Toggle these features by using \'!toggleWeeklyMemes\',\'!toggleBirthdays\',\'!toggleCalendar\' and \'!togglePolls\'', value: 'These options are either on or off. Use \'!helpEvents\' for more information.' },
        { name: '\u200B', value: '⚠️ ---IMPORTANT--- ⚠️' },
        { name: 'Please also move the automatic NeoBot role to either the top or just below the admin role of the roles list', value: 'This is to allow for the roles functions to work properly.' },
        { name: '\u200B', value: '---SERVER TEMPLATE---' },
        { name: "A server template is available", value: "Create new server [here](https://discord.new/wGdyZgK4efpq)." },
        { name: '\u200B', value: '---DO NOT DELETE---' },
        { name: '⚠️ PLEASE DO NOT DELETE THIS MESSAGE ⚠️', value: 'It can only appear once, and is intended to help you set up NEO. It should be pinned, or copied.' },
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
