import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, oldEmoji, newEmoji) => {
    try {
        let model;
        await GetServer({ serverid: oldEmoji.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === oldEmoji.guild.id && newEmoji.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription('Emoji Update')
                embed.addFields(
                    { name: 'An Emoji has been updated', value: `Details are listed below.` },
                    { name: 'Emoji Name', value: newEmoji.name !== '__' ? `${newEmoji.name}` : `EMPTY - change the name` },
                    { name: 'Emoji ID', value: `${newEmoji.id}`, inline: true },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'An emoji has been updated',
    name: 'emojiUpdate',
};