const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      let user = client.guilds.cache.find(item => item.id === interaction.guild_id).members.cache.get(interaction.member.user.id);

      if (user.roles.cache.find(item => item.name === "Member")) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription('You already have a role!')
        Reply(client, interaction, embed)
      } else {
        if (model.resultItems.serverid === user.guild.id && user.guild.channels.cache.find(item => item.id === model.resultItems.generalchannelid && model.resultItems.memberroleid !== '0')) {
          const commandEmbed = require('../embeds/commandEmbed')
          const embed = new Discord.MessageEmbed(commandEmbed)

          embed.setDescription(`Welcome to the server, <@${user.user.id}>!`)
          user.roles.add(model.resultItems.memberroleid)
          Reply(client, interaction, embed, model.resultItems.generalchannelid)
        } else {
          const alertEmbed = require('../embeds/alertEmbed')
          const embed = new Discord.MessageEmbed(alertEmbed)

          embed.setDescription('Validation error')
          Reply(client, interaction, embed)
        }
      }
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
  permLevel: 0
};

exports.help = {
  name: 'accept',
  description: 'Add the initial member role to your account!',
};
