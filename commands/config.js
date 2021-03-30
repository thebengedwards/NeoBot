const Discord = require("discord.js");
const { GetServer, UpdateServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
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
          { name: `Weekly Meme`, value: model.resultItems.weeklymeme ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Birthdays`, value: model.resultItems.birthdays ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Calendar`, value: model.resultItems.calendar ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
          { name: `Game Polls`, value: model.resultItems.polls ? `Enabled 🟩` : `Disabled 🟥`, inline: true },
        )
        Reply(client, interaction, embed)
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
            { name: 'Assign these roles by using the commands /setadminid, /setmodid, /setmemberid.', value: 'Find the role ID\'s by enabling Dev mode in the settings, and then right clicking the role in server settings, and select \'Copy ID\'. If you wish to reset a role once set, use 0. Use /help roles for more information.' },
            { name: '\u200B', value: '---CHANNELS---' },
            { name: 'NeoBot can also use a default of 6 text channels', value: 'It doesn\'t matter if you don\'t have 6 text channels, just assign these to any applicable.' },
            { name: 'Assign these channels by using the commands /setwelcomechannel, /setmodchannel, /setgeneralchannel, /setmemeschannel, /setgamechannel, /setupdatechannel.', value: 'Find the channel ID\'s by enabling Dev mode in the settings, and then right clicking the channel in the server, and select \'Copy ID\'. If you dont have a channel applicable, use 0. Use /help channels for more information.' },
            { name: '\u200B', value: '---FEATURES---' },
            { name: 'NeoBot also gives you the option to enable or disable certain features', value: 'These can be enabled or disabled at any point' },
            { name: 'Toggle these features by using /toggleweeklymemes, /togglebirthdays, /togglecalendar and /togglepolls.', value: 'These options are either on or off. Use /help events for more information.' },
            { name: '\u200B', value: '⚠️ ---IMPORTANT--- ⚠️' },
            { name: 'Please also move the automatic NeoBot role to either the top or just below the admin role of the roles list', value: 'This is to allow for the roles functions to work properly.' },
            { name: '\u200B', value: '---SERVER TEMPLATE---' },
            { name: "A server template is available", value: "Create new server [here](https://discord.new/wGdyZgK4efpq)." },
            { name: '\u200B', value: '---DO NOT DELETE---' },
            { name: '⚠️ PLEASE DO NOT DELETE THIS MESSAGE ⚠️', value: 'It can only appear once, and is intended to help you set up NeoBot. It should be pinned, or copied.' },
          )
          Reply(client, interaction, embed)
        } else {
          const alertEmbed = require('../embeds/alertEmbed')
          const embed = new Discord.MessageEmbed(alertEmbed)

          embed.setDescription(`${updateModel.message}`)
          Reply(client, interaction, embed)
        }
      }
    } else {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription(`${model.message}`)
      Reply(client, interaction, embed)
    }
  } catch (err) {
    const alertEmbed = require('../embeds/alertEmbed')
    const embed = new Discord.MessageEmbed(alertEmbed)

    embed.setDescription(`API Error`)
    Reply(client, interaction, embed)
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
