import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, oldRole, newRole) => {
    try {
        let model;
        await GetServer({ serverid: oldRole.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === oldRole.guild.id && newRole.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription('Role Updated')
                embed.addFields(
                    { name: 'A Role has been Updated', value: `Details are listed below.` },
                    { name: `Role Name: ${newRole.name}`, value: `Role ID: ${newRole.id}` },
                    { name: `Permissions Bitfield: ${newRole.permissions.bitfield}`, value: `Priority: ${newRole.rawPosition}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Role has been updated',
    name: 'roleUpdate',
};
