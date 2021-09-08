const { MessageEmbed } = require("discord.js");
const commandEmbed = require('../components/embeds/commandEmbed')

exports.Reply = async (client, interaction, response, destination, components) => {
    try {
        let data = response
        if (destination) {
            client.channels.cache.get(destination).send({ embeds: [data] });
            const embed = new MessageEmbed(commandEmbed)
            embed.setDescription(`Command Success!`)
            embed.addFields(
                { name: `Message was sent to another channel`, value: `Please check channel: ${client.channels.resolve(destination).name}` },
            )
            data = embed;
        }
        if (components) {
            await interaction.reply({ embeds: [data], components: [components] });
        } else {
            await interaction.reply({ embeds: [data] });
        }
    } catch (err) {
        console.log(err)
    }
}