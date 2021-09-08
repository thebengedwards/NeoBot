const { MessageButton } = require('discord.js');

const row = new MessageButton()
    .setCustomId('danger')
    .setLabel('Danger')
    .setStyle('DANGER')

module.exports = (row);