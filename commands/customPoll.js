const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const { Reply } = require("../functions/reply");
const pollEmbed = require('../components/embeds/pollEmbed');
const primaryButton = require('../components/buttons/primary');

exports.run = async (client, interaction, options) => {
    try {
        const embed = new MessageEmbed(pollEmbed)
        embed.setDescription('Custom poll')
        embed.addFields(
            { name: options._hoistedOptions[0].value, value: `Reply below` },
            { name: '\u200B', value: '---VOTES---' },
            { name: 'YES', value: `None`, inline: true },
            { name: 'NO', value: `None`, inline: true },
        )

        const row = new MessageActionRow()
        row.addComponents(
            new MessageButton(primaryButton)
                .setCustomId(`TRUE-${uuidv4()}`)
                .setLabel('Yes')
            ,
            new MessageButton(primaryButton)
                .setCustomId(`FALSE-${uuidv4()}`)
                .setLabel('No')
        )

        Reply(client, interaction, embed, null, row)
    } catch (err) {
        console.log(err)
    }
};

exports.command = {
    description: 'A custom poll',
    enabled: true,
    name: 'custompoll',
    options: [
        { name: 'title', description: 'The title of the poll', required: true, type: 3 },
    ],
    permLevel: 1
};