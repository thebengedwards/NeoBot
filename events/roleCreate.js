import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, role) => {
    try {
        let model;
        await GetServer({ serverid: role.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === role.guild.id && role.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription('Role Creation')
                embed.addFields(
                    { name: 'A Role has been Created', value: `Details are listed below.` },
                    { name: `Role Name: ${role.name}`, value: `Role ID: ${role.id}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Role has been created',
    name: 'roleCreate',
};