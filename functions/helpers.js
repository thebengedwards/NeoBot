const Discord = require("discord.js");

exports.Reply = async (client, interaction, response, destination) => {
    try {
        const createAPIMessage = async (interaction, content) => {
            const { data, files } = await Discord.APIMessage.create(
                client.channels.resolve(interaction.channel_id),
                content
            )
                .resolveData()
                .resolveFiles()
            return { ...data, files }
        }

        let data = { content: response }

        if (destination) {
            client.channels.cache.get(destination).send(response);

            const commandEmbed = require('../embeds/commandEmbed')
            const embed = new Discord.MessageEmbed(commandEmbed)

            embed.setDescription(`Command Success!`)
            embed.addFields(
                { name: `Message was sent to another channel`, value: `Please check channel: ${client.channels.resolve(destination).name}` },
            )
            response = embed;
        }
        if (typeof response === 'object') {
            data = await createAPIMessage(interaction, response)
        }
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data,
            }
        })
        return data;
    } catch {
        
    }
}