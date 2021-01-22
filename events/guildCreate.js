const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = guild => {
  const body = {
    serverName: guild.name,
    serverID: guild.id,
    ownerID: guild.ownerID,
    setupComplete: false,
    adminRoleID: '0',
    modRoleID: '0',
    memberRoleID: '0',
    welcomeChannelID: '0',
    modChannelID: '0',
    generalChannelID: '0',
    memesChannelID: '0',
    gameUpdatesChannelID: '0',
    updateLogChannelID: '0',
    weeklyMeme: false,
    birthdays: false,
    calendar: false,
    polls: false,
    joinedDate: new Date(),
  };

  fetch(`${PATH}/servers`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    },
  })
    .then(res => res.json())

  const alertEmbed = require('../embeds/alertEmbed');
  const embed = new Discord.MessageEmbed(alertEmbed);

  embed.setDescription('Config Required');
  embed.addFields(
    { name: `NeoBot has joined: ${guild.name}`, value: 'A config is required' },
    { name: 'Use \'!config\' in your server to start setting up NeoBot for your server.', value: 'You can see active settings by using \'!config\'.' },
    { name: '\u200B', value: '⚠️ ---IMPORTANT--- ⚠️' },
    { name: 'Only a server owner or a member of a role called \'Admin\' can start a config.', value: 'This is for security reasons' }
  )

  try {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
      let c = channels[key];
      if (c[1].type === "text") {
        channelID = c[0];
        break channelLoop;
      }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send({ embed });
  }
  catch (err) {
    console.log(`Error 001`)
  }
};
