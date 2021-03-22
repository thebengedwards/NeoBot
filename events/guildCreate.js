const Discord = require("discord.js");
const moment = require("moment");
const { CreateServer } = require("../functions/http-functions/servers");

module.exports = async (guild) => {
  const body = {
    servername: guild.name,
    serverid: guild.id,
    ownerid: guild.ownerID,
    setupcomplete: false,
    adminroleid: '0',
    modroleid: '0',
    memberroleid: '0',
    welcomechannelid: '0',
    modchannelid: '0',
    generalchannelid: '0',
    memeschannelid: '0',
    gamechannelid: '0',
    updateschannelid: '0',
    weeklymeme: false,
    birthdays: false,
    calendar: false,
    polls: false,
    joineddate: moment(new Date()).format('YYYY-MM-DD')
  };

  await CreateServer(body)
    .catch((err) => { console.log(err) });

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
