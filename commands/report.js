const Discord = require("discord.js")
const settings = require("../settings.json")
const { GetServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction, options) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      const messageText = options.find(item => item.name === 'message').value

      const commandEmbed = require('../embeds/commandEmbed')
      const replyEmbed = new Discord.MessageEmbed(commandEmbed)

      replyEmbed.setDescription(`Command Success!`)
      replyEmbed.addFields(
        { name: `Report was sent!`, value: `Thank you for your feedback!` },
      )
      Reply(client, interaction, replyEmbed)

      const reportEmbed = require('../embeds/reportEmbed');
      const embed = new Discord.MessageEmbed(reportEmbed);

      embed.setDescription(`New Report`)
      embed.addFields(
        { name: 'Report By:', value: `${interaction.member.user.username}` },
        { name: 'Report:', value: `${messageText}` },
        { name: `From Server: ${client.guilds.resolve(interaction.guild_id).name}`, value: `Server ID: ${interaction.guild_id}` },
        { name: 'Please handle this report with care!', value: 'If it contains sensitive information please be professional' },
      )
      return client.users.fetch(settings.reportid, false).then((user) => {
        user.send({ embed });
      });
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
  permLevel: 2
};

exports.help = {
  name: 'report',
  description: 'Report any issues or feedback! Just send NeoBot a Direct Message with !report',
  options: [
    { name: 'message', description: 'Enter the feedback or issue you want the devs to see', required: true, type: 3 },
  ]
};
