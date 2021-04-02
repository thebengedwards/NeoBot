const Discord = require("discord.js");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction, options) => {
  try {
    const messagecount = options.find(item => item.name === 'amount').value
    if (messagecount > 100) {
      const alertEmbed = require('../embeds/alertEmbed');
      const embed = new Discord.MessageEmbed(alertEmbed);

      embed.setDescription('Maximum 100 messages can be purged at once');
      Reply(client, interaction, embed)
    } else {
      client.guilds.resolve(interaction.guild_id).channels.resolve(interaction.channel_id).messages.fetch({ limit: messagecount })
        .then(async (messages) => {
          await client.guilds.resolve(interaction.guild_id).channels.resolve(interaction.channel_id).bulkDelete(messages)
            .catch(err => {
              const alertEmbed = require('../embeds/alertEmbed');
              const embed = new Discord.MessageEmbed(alertEmbed);

              embed.setDescription('Messages older than 14 days cannot be purged');
              Reply(client, interaction, embed)
            })
        })
        .then(res => {
          const alertEmbed = require('../embeds/alertEmbed');
          const embed = new Discord.MessageEmbed(alertEmbed);

          embed.setDescription(`${messagecount} messages purged`);
          Reply(client, interaction, embed)
        })
    }
  } catch {
    const alertEmbed = require('../embeds/alertEmbed');
    const embed = new Discord.MessageEmbed(alertEmbed);

    embed.setDescription('Purge Error');
    Reply(client, interaction, embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  options: [
    { name: 'amount', description: 'The amount of the messages you would like to purge from the channel', required: true, type: 4 },
  ]
};
