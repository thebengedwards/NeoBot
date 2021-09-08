const { MessageButton } = require('discord.js');

const row = new MessageButton()
    .setCustomId('success')
    .setLabel('Sucess')
    .setStyle('SUCCESS')

module.exports = (row);