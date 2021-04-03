const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const profanities = require('profanities')

module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
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
        if (model.resultItems.profanities) {
          let messageItems = message.content.split(" ");
          if (profanities.some(index => messageItems.indexOf(index) >= 0)) {
            messageItems.map((item, index) => {
              if (profanities.includes(item.toLowerCase())) {
                messageItems[index] = messageItems[index].replace(messageItems[index], messageItems[index].split("").map(item => 'x')).replaceAll(',', '')
              }
            })
            let messageContent = messageItems.join(' ')
            const filterEmbed = require('../embeds/filterEmbed')
            const embed = new Discord.MessageEmbed(filterEmbed)

            embed.setTitle(message.author.username)
            embed.setDescription(messageContent)
            embed.addFields(
              { name: `Please do not use profanities`, value: `To disable profanity filtering use /setToggle profanity` },
            )
            message.delete()
            message.reply({ embed });
          }
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
};
