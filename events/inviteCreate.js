import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, invite) => {
    try {
        let model;
        await GetServer({ serverid: invite.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === invite.guild.id && invite.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription(`New Invite Created by <@${invite.inviter.id}>`)
                embed.addFields(
                    { name: `Invite URL: https://discord.gg/${invite.code}`, value: `Invite valid for: ${invite.maxAge === 0 ? `Unlimited` : invite.maxAge} seconds.` },
                    { name: `Current Members: ${invite.channel.guild.memberCount}`, value: `Maximum Members: ${invite.channel.guild.maximumMembers}` },
                    { name: `Invited Channel: ${invite.channel.name}`, value: `Maximum Uses: ${invite.maxUses === 0 ? `Unlimited` : invite.maxUses}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Guild invite created',
    name: 'inviteCreate',
};