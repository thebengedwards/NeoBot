const { MessageButton } = require('discord.js');

const row = new MessageButton()
    .setCustomId('primary')
    .setLabel('Primary')
    .setStyle('PRIMARY')

module.exports = (row);