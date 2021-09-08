const { MessageButton } = require('discord.js');

const row = new MessageButton()
    .setCustomId('secondary')
    .setLabel('Secondary')
    .setStyle('SECONDARY')

module.exports = (row);