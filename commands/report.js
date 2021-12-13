import { MessageEmbed } from "discord.js";
import Settings from "../settings.js";
import { GetServer } from "../functions/http-functions/servers.js";
import Reply from "../functions/reply.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";
import CommandEmbed from "../components/embeds/commandEmbed.js";
import ReportEmbed from "../components/embeds/reportEmbed.js";

export const run = async (client, interaction, options) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      const messageText = options.find(item => item.name === 'message').value

      const replyEmbed = new MessageEmbed(CommandEmbed)

      replyEmbed.setDescription(`Command Success!`)
      replyEmbed.addFields(
        { name: `Report was sent!`, value: `Thank you for your feedback!` },
      )
      Reply(client, interaction, replyEmbed)

      const embed = new MessageEmbed(ReportEmbed);

      embed.setDescription(`New Report`)
      embed.addFields(
        { name: 'Report By:', value: `${interaction.member.user.username}` },
        { name: 'Report:', value: `${messageText}` },
        { name: `From Server: ${client.guilds.resolve(interaction.guild_id).name}`, value: `Server ID: ${interaction.guild_id}` },
        { name: 'Please handle this report with care!', value: 'If it contains sensitive information please be professional' },
      )
      return client.users.fetch(Settings.reportid, false).then((user) => {
        user.send({ embed });
      });
    } else {
      const embed = new MessageEmbed(AlertEmbed)

      embed.setDescription(`${model.message}`)
      Reply(client, interaction, embed)
    }
  } catch (err) {
    console.log(err)
  }
};

export const details = {
  description: 'Report any issues or feedback! Just send NeoBot a Direct Message with !report',
  enabled: true,
  name: 'report',
  options: [
    { name: 'message', description: 'Enter the feedback or issue you want the devs to see', required: true, type: 3 },
  ],
  permLevel: 2
};
