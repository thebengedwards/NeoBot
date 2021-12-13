import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, emoji) => {
    try {
        let model;
        await GetServer({ serverid: emoji.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.serverid === emoji.guild.id && emoji.guild.channels.cache.find(item => item.id === model.modchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription('Emoji Deletion')
                embed.addFields(
                    { name: 'An Emoji has been deleted', value: `Details are listed below.` },
                    { name: 'Emoji Name', value: `${emoji.name}` },
                    { name: 'Emoji ID', value: `${emoji.id}` },
                    { name: 'Emoji Animated', value: `${emoji.animated}`, inline: true },
                )
                return client.channels.cache.get(model.modchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'An emoji has been deleted',
    name: 'emojiDelete',
};