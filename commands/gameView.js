const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === message.guild.id) {
        if (args.length === 1) {
            let game;
            await fetch(`${PATH}/games/"${args[0].toLowerCase().replace('_', ' ')}"`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json())
                .then(json => game = json);

            if (game.message) {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Game');
                embed.addFields(
                    { name: `${game.message}`, value: `Please try again.` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a game, use \'!gameAdd\', to view a game, use \'!gameView\', to see all games use \'!gameAll\', to update a game use \'!gameUpdate\',to delete a game use \'!gameDelete\'.' },
                    { name: 'IMPORTANT:', value: 'Use \'_\' instead of [space], a parser removes this from the message' },
                )
                return message.channel.send({ embed })
            } else {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Game');
                embed.addFields(
                    { name: `Found Game: ${game.gameName}`, value: `Game Type: ${game.gameType}, Rating: ${game.gameRating}, Play with: ${game.playWith} others.` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a game, use \'!gameAdd\', to view a game, use \'!gameView\', to see all games use \'!gameAll\', to update a game use \'!gameUpdate\',to delete a game use \'!gameDelete\'.' },
                )
                return message.channel.send({ embed })
            }
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of gameView');
            embed.addFields(
                { name: 'Use like this:', value: '!gameView <Name>' },
                { name: 'IMPORTANT:', value: 'Use \'_\' instead of [space], a parser removes this from the message' },
            )
            return message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
};

exports.help = {
    name: 'gameView',
    description: 'View a single game on NEO',
    usage: 'gameView <Game_Name>'
};
