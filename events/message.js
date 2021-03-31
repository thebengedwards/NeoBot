const Discord = require("discord.js");
const settings = require("../settings.json");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return;
    if (message.member === null) {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription('Please only send NeoBot messages in servers')
      return message.channel.send({ embed })
    }

    if (message.channel.type !== 'dm') {
      let model;
      await GetServer({ serverid: message.guild.id })
        .then(res => model = res.data.model)
        .catch(err => model = err.response.data.model);

      if (model.status === 'success') {
        // Profanity Filtering in Version 2.2.0
      }
    }
  } catch (err) {
    console.log(err)
  }
};
