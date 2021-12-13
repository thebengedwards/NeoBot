import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { v4 as uuidv4 } from "uuid";
import Reply from "../functions/reply.js";
import PollEmbed from "../components/embeds/pollEmbed.js";
import PrimaryButton from "../components/buttons/primary.js";

export const run = async (client, interaction, options) => {
    try {
        const embed = new MessageEmbed(PollEmbed)
        embed.setDescription('Custom poll')
        embed.addFields(
            { name: options._hoistedOptions[0].value, value: `Reply below` },
            { name: '\u200B', value: '---VOTES---' },
            { name: 'YES', value: `None`, inline: true },
            { name: 'NO', value: `None`, inline: true },
        )

        const row = new MessageActionRow()
        row.addComponents(
            new MessageButton(PrimaryButton)
                .setCustomId(`TRUE-${uuidv4()}`)
                .setLabel('Yes')
            ,
            new MessageButton(PrimaryButton)
                .setCustomId(`FALSE-${uuidv4()}`)
                .setLabel('No')
        )

        Reply(client, interaction, embed, null, row)
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'A custom poll',
    enabled: true,
    name: 'custompoll',
    options: [
        { name: 'title', description: 'The title of the poll', required: true, type: 3 },
    ],
    permLevel: 1
};