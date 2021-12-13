import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import Reply from "../functions/reply.js";
import AlertEmbed from '../components/embeds/alertEmbed.js';
import CommandEmbed from '../components/embeds/commandEmbed.js';

export const run = async (client, interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.member.guild.id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status == 'success') {
      let user = client.guilds.cache.find(item => item.id == interaction.member.guild.id).members.cache.get(interaction.member.user.id);

      if (user.roles.cache.find(item => item.name == "Member")) {
        const embed = new MessageEmbed(AlertEmbed)
        embed.setDescription('You already have a role!')
        Reply(client, interaction, embed)
      } else {
        if (model.resultItems.serverid == user.guild.id && user.guild.channels.cache.find(item => item.id == model.resultItems.generalchannelid && model.resultItems.memberroleid !== '0')) {
          const embed = new MessageEmbed(CommandEmbed)
          embed.setDescription(`Welcome to the server, <@${user.user.id}>!`)
          user.roles.add(model.resultItems.memberroleid)
          Reply(client, interaction, embed, model.resultItems.generalchannelid)
        } else {
          const embed = new MessageEmbed(AlertEmbed)
          embed.setDescription('Validation error - have you set the general channel?')
          Reply(client, interaction, embed)
        }
      }
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
  description: 'Add the initial member role to your account!',
  enabled: true,
  name: 'accept',
  permLevel: 0
};
