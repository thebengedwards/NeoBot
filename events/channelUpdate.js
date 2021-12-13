import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, oldChannel, newChannel) => {
    try {
        let model;
        if (oldChannel.type !== 'dm') {
            await GetServer({ serverid: oldChannel.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (model.resultItems.serverid === oldChannel.guild.id && newChannel.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                    const embed = new MessageEmbed(EventEmbed)

                    embed.setDescription('Channel Update')
                    embed.addFields(
                        { name: 'A Channel has been Updated', value: `Details are listed below.` },
                        { name: 'Channel Name', value: `${newChannel.name}` },
                        { name: 'Channel Topic', value: newChannel.topic !== null ? `${newChannel.topic}` : `None yet` },
                        { name: 'Channel Type', value: `${newChannel.type}`, inline: true },
                        { name: 'Channel ID', value: `${newChannel.id}`, inline: true },
                        { name: 'Channel NSFW', value: `${newChannel.nsfw}`, inline: true },
                    )
                    return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'A channel has been updated',
    name: 'channelUpdate',
};