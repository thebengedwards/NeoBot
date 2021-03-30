const Discord = require("discord.js");
const { Reply } = require("../functions/helpers")

module.exports = async (client, interaction) => {
    const { name, options } = interaction.data
    const perms = await client.elevation(interaction);
    const command = interaction.data.name.toLowerCase()
    cmd = client.commands.get(command);

    if (perms < cmd.conf.permLevel) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription('You do not have permission to use this command')
        Reply(client, interaction, embed)
    } else {
        cmd.run(client, interaction, options, perms);
    }
};
