const { MessageEmbed } = require("discord.js");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const polls = require('../components/buttons/handlers/polls')

module.exports = async (client, interaction) => {
    try {
        if (interaction.isButton()) {
            const currentEmbed = interaction.message.embeds[0],
                currentComponents = interaction.message.components[0],
                action = interaction.customId.toString().startsWith('TRUE') ? true : false;

            if (currentEmbed.title == "**Poll**") polls(interaction, action, currentEmbed, currentComponents)
        } else {
            const { member, options } = interaction
            const perms = await client.elevation(member.guild.id);
            const command = interaction.commandName.toLowerCase()
            cmd = client.commands.get(command);

            if (perms < cmd.command.permLevel) {
                const embed = new MessageEmbed(alertEmbed)

                embed.setDescription('You do not have permission to use this command')
                Reply(client, interaction, embed)
            } else {
                cmd.run(client, interaction, options, perms);
            }
        }
    } catch (err) {
        console.log(err)
    }
};
