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
      { name: 'Version 2.1.0', value: 'Minor Text fixes and improvements to features brought in version 2. \'All\' commands no longer just paste results below the embed, and are now included with the embed body. Various text fixes. Polls have been updated to now be cleaer on who said yes, and who said no. Backend fixes for updating various data has been fixed.' },
    )
    return message.channel.send({ embed })
  } else {
    console.log('Error')
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
  usage: 'log'
};