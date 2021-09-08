const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { CreateServer } = require("../functions/http-functions/servers");
const alertEmbed = require('../components/embeds/alertEmbed');

module.exports = async (guild) => {
  try {
    const body = {
      servername: guild.name,
      serverid: guild.id,
      ownerid: guild.ownerId,
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
      joineddate: moment(new Date()).format('YYYY-MM-DD'),
      profanities: false,
    };

    let model;
    await CreateServer(body)
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      const embed = new MessageEmbed(alertEmbed);

      embed.setDescription('Config Required');
      embed.addFields(
        { name: `NeoBot has joined: ${guild.name}`, value: 'A config is required' },
        { name: 'Use \'!config\' in your server to start setting up NeoBot for your server.', value: 'You can see active settings by using \'!config\'.' },
        { name: '\u200B', value: '⚠️ ---IMPORTANT--- ⚠️' },
        { name: 'Only a server owner or a member of a role called \'Admin\' can start a config.', value: 'This is for security reasons' }
      )

      let channel = guild.channels.cache.get(guild.systemChannelId || guild.channels.cache.filter(channel => channel.type == 'GUILD_TEXT').map(channel => channel.id)[0]);
      channel.send({ embeds: [embed] });
    } else {
      console.log(model.message)
    }
  } catch (err) {
    console.log(err)
  }
};
