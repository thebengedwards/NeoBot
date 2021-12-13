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

                embed.setDescription(`An Invite was Deleted`)
                embed.addFields(
                    { name: `Invite Code: ${invite.code}`, value: `Send new invites to affected users` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Guild invite deleted',
    name: 'inviteDelete',
};