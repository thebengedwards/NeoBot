const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Log')
      embed.addFields(
        { name: 'Version 1.0.0', value: 'Birthday reminders, Jokes, Meme of the day and General Mod Tools.' },
        { name: 'Version 1.0.1', value: 'Fixed Birthday Bug.' },
        { name: 'Version 1.0.2', value: 'Temporarily removed \'Meme of the day\' as it was not working as intended.' },
        { name: 'Version 1.1.0', value: 'Added Version Log, Role Assignment Functionality, Version Status, Fixed Daily Meme, Fixed Jokes, changed prefix from \'~\' to \'!\'.' },
        { name: 'Version 1.1.1', value: 'Minor Bug Fixes.' },
        { name: 'Version 1.1.2', value: 'Moved Host from Glitch to HEROKU.' },
        { name: 'Version 1.1.3', value: 'Added new dates to NeoBot\'s calendar, Backend stability fixes.' },
        { name: 'Version 1.1.4', value: 'Fixed Birthday Announcements.' },
        { name: 'Version 1.1.5', value: 'Fixed Bugs.' },
        { name: 'Version 2.0.0', value: 'Major \'Under-the-hood\' improvements, New Discord Embeds, Admin Purges, Added security, Many minor Bug Fixes, \'Weekly Meme\' Imgur mp4 bug fix, Game Polling, Reporting through direct messages, API Integration, Database Management Abilities, Various Dev Commands and much, much more!' },
        { name: 'Version 2.1.0', value: 'Minor Text fixes and improvements to features brought in version 2. NEW SLASH COMMANDS! \'All\' commands no longer just paste results below the embed, and are now included with the embed body. Various text fixes. Polls have been updated to now be cleaer on who said yes, and who said no. Backend fixes and updating data has now been fixed.' },
        { name: 'Version 2.1.1', value: 'Fixed Bug in profanity filtering.' },
        { name: 'Version 2.2.0', value: 'Upgraded Engine, Added Buttons to polls.' },
      )
      Reply(client, interaction, embed)
    } else {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription(`${model.message}`)
      Reply(client, interaction, embed)
    }
  } catch {
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
  permLevel: 1
};

exports.help = {
  name: 'log',
  description: 'Logs all the differences between previous versions',
};