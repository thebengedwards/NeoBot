const Discord = require("discord.js")
const { GetServer, UpdateServer } = require("../functions/http-functions/servers")

exports.run = async (client, message) => {
  let model;
  await GetServer({ serverid: message.guild.id })
    .then(res => model = res.data.model)
    .catch(err => model = err.response.data.model);

  if (model.status === 'success') {
    if (model.resultItems.serverid === message.guild.id) {
      if (model.resultItems.setupcomplete) {
        const commandEmbed = require('../embeds/commandEmbed')
        const embed = new Discord.MessageEmbed(commandEmbed)

        embed.setDescription('Config')
        embed.addField('Completed Setup:', model.resultItems.setupcomplete ? `Complete 🟩` : `Incomplete 🟥`)
        embed.addFields(
          { name: '\u200B', value: '---ROLES---' },
          { name: `Role Settings`, value: 'Please set the Roles in order to use NeoBot' },
          { name: `Admin Role:`, value: model.resultItems.adminroleid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Moderator Role:`, value: model.resultItems.modroleid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Member Role:`, value: model.resultItems.memberroleid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: '\u200B', value: '---CHANNELS---' },
          { name: `Channel Settings`, value: 'Please set the Channels in order to use NeoBot' },
          { name: `Welcome Channel:`, value: model.resultItems.welcomechannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Moderator Channel:`, value: model.resultItems.modchannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `General Channel:`, value: model.resultItems.generalchannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Memes Channel:`, value: model.resultItems.memeschannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Game Updates Channel:`, value: model.resultItems.gamechannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: `Update Log Channel:`, value: model.resultItems.updateschannelid !== '0' ? `Set 🟩` : `Unset 🟥`, inline: true },
          { name: '\u200B', value: '---FEATURES---' },
          { name: `Events Settings`, value: 'What features are enabled/disabled' },
          { name: `Weekly Meme`, value: model.resultItems.weeklymeme === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Birthdays`, value: model.resultItems.birthdays === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Calendar`, value: model.resultItems.calendar === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Game Polls`, value: model.resultItems.polls === 1 ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        )
        return message.channel.send({ embed });
      } else {
        const body = {
          servername: model.resultItems.servername,
          serverid: model.resultItems.serverid,
          setupcomplete: true,
          adminroleid: model.resultItems.adminroleid,
          modroleid: model.resultItems.modroleid,
          memberroleid: model.resultItems.memberroleid,
          welcomechannelid: model.resultItems.welcomechannelid,
          modchannelid: model.resultItems.modchannelid,
          generalchannelid: model.resultItems.generalchannelid,
          memeschannelid: model.resultItems.memeschannelid,
          gamechannelid: model.resultItems.gamechannelid,
          updateschannelid: model.resultItems.updateschannelid,
          weeklymeme: model.resultItems.weeklymeme,
          birthdays: model.resultItems.birthdays,
          calendar: model.resultItems.calendar,
          polls: model.resultItems.polls,
        }

        let updateModel;
        await UpdateServer(body)
          .then(res => updateModel = res.data.model)
          .catch(err => updateModel = err.response.data.model);

        if (updateModel.status === 'success') {
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
          const alertEmbed = require('../embeds/alertEmbed')
          const embed = new Discord.MessageEmbed(alertEmbed)

          embed.setDescription('An Error has occurred')
          embed.addFields(
            { name: 'Message:', value: `${updateModel.message}` },
          )
        }
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'config',
  description: 'Configure Neo',
  usage: 'config'
};
