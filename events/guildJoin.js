const Discord = require('discord.js');

module.exports = guild => {
  const alertEmbed = require('../embeds/alertEmbed');
  const embed = new Discord.MessageEmbed(alertEmbed);

  embed.setDescription('Config Required');
  embed.addFields(
    { name: `NEO has joined: ${guild.name}`, value: 'A config is required' },
    { name: 'Use \'!config\' in your server to start setting up NEO for your server.', value: 'You can see active settings by using \'!config\'.' }
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

  // In database set guild.name, guild.id and guild.ownderID

};
