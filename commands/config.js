const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
  let data = await fetch(`${PATH}/servers/949494949494`, {
  //let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  }).then(res => res.json());

  if (!data.toLowerCase().startsWith('cannot find server with serverid of:')) {
    if (data.setupComplete) {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Config')
      embed.addField('Completed Setup:', server.setupComplete ? `Complete 🟩` : `Incomplete 🟥`)
      embed.addFields(
        { name: '\u200B', value: '\u200B' },
        { name: `Role Settings`, value: 'Please set the Roles in order to use NEO' },
        { name: `Admin Role:`, value: server.adminRoleID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Role:`, value: server.adminRoleID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Member Role:`, value: server.adminRoleID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: `Channel Settings`, value: 'Please set the Channels in order to use NEO' },
        { name: `Welcome Channel:`, value: server.welcomeChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Moderator Channel:`, value: server.modChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `General Channel:`, value: server.generalChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Memes Channel:`, value: server.memesChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Game Updates Channel:`, value: server.gameUpdatesChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: `Update Log Channel:`, value: server.updateLogChannelID !== 0 ? `Set 🟩` : `Unset 🟥`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: `Events Settings`, value: 'What features are enabled/disabled' },
        { name: `Weekly Meme`, value: server.weeklyMeme ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Birthdays`, value: server.birthdays ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Calendar`, value: server.calendar ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: `Game Polls`, value: server.polls ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Please use !help to find which commands will let you change settings', value: '!help will also tell you all available commands!' },
        // { name: `!setAdminRole <Admin Role ID here>`, value: 'Tell NEO what your servers Admin role is'},
        // { name: `!setModRole <Moderator Role ID here>`, value: 'Tell NEO what your servers Moderator role is'},
        // { name: `!setMemberRole <Member Role ID here>`, value: 'Tell NEO what your servers Member role is'},
        // { name: `!setWelcomeChannel <Welcome Channel ID here>`, value: 'Tell NEO what your servers Welcome channel is'},
        // { name: `!setModeratorChannel <Moderator Channel ID here>`, value: 'Tell NEO what your servers Moderator channel is'},
        // { name: `!setGeneralChannel <General Channel ID here>`, value: 'Tell NEO what your servers General channel is'},
        // { name: `!setMemesChannel <Memes Channel ID here>`, value: 'Tell NEO what your servers Memes channel is'},
        // { name: `!setGameUpdatesChannel <Game Updates Channel ID here>`, value: 'Tell NEO what your servers Game Updates channel is'},
        // { name: `!setUpdateLogChannel <Update Log Channel ID here>`, value: 'Tell NEO what your servers Update Log channel is'},
        // { name: `!toggleWeeklyMemes`, value: 'Enables/Disables Weekly memes sent to the Memes Channel'},
        // { name: `!toggleBirthdays`, value: 'Enables/Disables Birthday events'},
        // { name: `!toggleCalendar`, value: 'Enables/Disables Calendar events'},
        // { name: `!toggleGamePolls`, value: 'Enables/Disables Game polls'},
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
  } else {
    console.log(data)
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
