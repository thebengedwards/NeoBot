const Discord = require('discord.js');
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = guild => {
  const body = { 
    serverName: guild.name,
    serverID: guild.id,
    ownerID: guild.ownerID,
  };

  fetch(`${PATH}/servers`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => console.log(json));

  console.log(JSON.stringify(body))

  const alertEmbed = require('../embeds/alertEmbed');
  const embed = new Discord.MessageEmbed(alertEmbed);

  embed.setDescription('Config Required');
  embed.addFields(
    { name: `NEO has joined: ${guild.name}`, value: 'A config is required' },
    { name: 'Use \'!config\' in your server to start setting up NEO for your server.', value: 'You can see active settings by using \'!config\'.' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Only a server owner or a member of a role called \'Admin\' can start a config.', value: 'This is for security reasons' }
  )

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

  // In database set guild.name, guild.id and guild.ownderID, the rest either 0 or false

};
