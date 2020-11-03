const Discord = require('discord.js')
const cron = require('cron')
const settings = require('../settings.json');
const games = require('../arrays/games')

module.exports = client => {
    games.forEach((game) => {
        const pollEmbed = require('../embeds/pollEmbed')
        const embed = new Discord.MessageEmbed(pollEmbed)

        let subreddits = require('../arrays/subreddits');
    })
};