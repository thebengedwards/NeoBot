import { MessageEmbed } from "discord.js";
import moment from "moment";
import { GetServer } from "../functions/http-functions/servers.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";

export const run = async (client, messages) => {
    try {
        let message = messages.first()

        if (message.channel.type !== 'dm') {
            let model;
            await GetServer({ serverid: message.guild.id })
                .then(res => model = res.data.model)
                .catch(err => model = err.response.data.model);

            if (model.status === 'success') {
                if (model.resultItems.serverid === message.guild.id && message.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                    const embed = new MessageEmbed(AlertEmbed)

                    embed.setDescription(`Purge detected in chanel: ${message.channel.name}`)
                    embed.addFields(
                        { name: `Messages Deleted: ${messages.size}`, value: `Purged Date: ${moment(new Date()).format('Do MMMM YYYY, HH:mm:ss')}` },
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
    description: 'Bulk messages have been deleted',
    name: 'messageDeleteBulk',
};