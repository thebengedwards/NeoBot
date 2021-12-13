import { MessageEmbed } from "discord.js";
import Reply from "../functions/reply.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";
import Polls from "../components/buttons/handlers/polls.js";

export const run = async (client, interaction) => {
    try {
        if (interaction == false) { //T)DO interaction isButton
            const currentEmbed = interaction.message.embeds[0],
                currentComponents = interaction.message.components[0],
                action = interaction.customId.toString().startsWith('TRUE') ? true : false;

            if (currentEmbed.title == "**Poll**") Polls(interaction, action, currentEmbed, currentComponents)
        } else {
            const { guild_id, data } = interaction;
            const perms = await client.elevation(guild_id);
            const interactionCommand = data.name.toLowerCase();
            const command = client.commands.find(item => item.name == interactionCommand);

            if (perms < command.permLevel) {
                const embed = new MessageEmbed(AlertEmbed)

                embed.setDescription('You do not have permission to use this command')
                Reply(client, interaction, embed)
            } else {
                command.run(client, interaction, data.options, perms);
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Interaction with bot was created',
    name: 'interactionCreate',
};