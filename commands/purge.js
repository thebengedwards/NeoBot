import { MessageEmbed } from "discord.js";
import Reply from "../functions/reply.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";

export const run = async (client, interaction, options) => {
  try {
    const messagecount = options.find(item => item.name === 'amount').value
    if (messagecount > 100) {
      const embed = new MessageEmbed(AlertEmbed);

      embed.setDescription('Maximum 100 messages can be purged at once');
      Reply(client, interaction, embed)
    } else {
      client.guilds.resolve(interaction.guild_id).channels.resolve(interaction.channel_id).messages.fetch({ limit: messagecount })
        .then(async (messages) => {
          await client.guilds.resolve(interaction.guild_id).channels.resolve(interaction.channel_id).bulkDelete(messages)
            .catch(err => {
              const embed = new MessageEmbed(AlertEmbed);

              embed.setDescription('Messages older than 14 days cannot be purged');
              Reply(client, interaction, embed)
            })
        })
        .then(res => {
          const embed = new MessageEmbed(AlertEmbed);

          embed.setDescription(`${messagecount} messages purged`);
          Reply(client, interaction, embed)
        })
    }
  } catch (err) {
    console.log(err)
  }
};

export const details = {
  description: 'Purges X amount of messages from a given channel.',
  enabled: true,
  name: 'purge',
  options: [
    { name: 'amount', description: 'The amount of the messages you would like to purge from the channel', required: true, type: 4 },
  ],
  permLevel: 3
};
