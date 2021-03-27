const Discord = require("discord.js")
const moment = require("moment")
const settings = require("../settings.json")
const { GetServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      let user = interaction.member.user;
      let guild = client.guilds.cache.find(item => item.id === interaction.guild_id);
      
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('Test')
      embed.addFields(
        { name: `Hello ${user.username}`, value: `🟩 NeoBot is currently Online 🟩` },
        { name: '\u200B', value: `---CURRENT SERVER---` },
        { name: 'Name:', value: `${guild.name}`, inline: true },
        { name: 'Members:', value: `${guild.memberCount}`, inline: true },
        { name: 'Region:', value: `${guild.region}`, inline: true },
        { name: '\u200B', value: `---ABOUT NEOBOT---` },
        { name: 'Active Servers', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Available Commands:', value: `${client.commands.size}`, inline: true },
        { name: 'Verified:', value: `${client.user.verified}`, inline: true },
        { name: '\u200B', value: `---DATA---` },
        { name: 'Joined date:', value: `${moment(guild.joinedTimestamp).format('Do MMMM YYYY')}`, inline: true },
        { name: 'Powered by:', value: `${settings.host}`, inline: true }
      )
      Reply(client, interaction, embed )
    }
  } catch {
    console.log('Error connecting to API')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'Test command. Check if I am online!',
  usage: 'test'
};
