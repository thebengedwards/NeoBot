const { MessageButton } = require('discord.js');

const row = new MessageButton()
    .setCustomId('link')
    .setLabel('Link')
    .setStyle('LINK')

module.exports = (row);