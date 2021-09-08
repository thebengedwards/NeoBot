const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const profanities = require('profanities');
const alertEmbed = require('../components/embeds/alertEmbed');
const filterEmbed = require('../components/embeds/filterEmbed');

module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
    if (message.member === null) {
      const embed = new MessageEmbed(alertEmbed)

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
          if (messageItems.some(index => profanities.indexOf(index.toLowerCase()) >= 0)) {
            messageItems.map((item, index) => {
              if (profanities.includes(item.toLowerCase())) {
                messageItems[index] = messageItems[index].replace(messageItems[index], messageItems[index].split("").map(item => 'x')).replaceAll(',', '')
              }
            })
            let messageContent = messageItems.join(' ')
            const embed = new MessageEmbed(filterEmbed)

            embed.setTitle(message.author.username)
            embed.setDescription(messageContent)
            embed.addFields(
              { name: `Please do not use profanities`, value: `To disable profanity filtering use /setToggle profanity` },
            )
            message.delete()
            message.reply({ embeds: [embed] });
          }
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
};
