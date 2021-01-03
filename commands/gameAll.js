const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === message.guild.id) {
        let games = await fetch(`${PATH}/games`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': KEY
            }
        })
            .then(res => res.json());

        const commandEmbed = require('../embeds/commandEmbed');
        const embed = new Discord.MessageEmbed(commandEmbed);

        embed.setDescription('All Games');
        embed.addFields(
            { name: `Below are all the games saved on NEO.`, value: `Please be carful with this information` },
            { name: 'This command is dev only. DO NOT USE IT', value: 'To add a game, use \'!gameAdd\', to view a game, use \'!gameView\', to see all games use \'!gameAll\', to update a game use \'!gameUpdate\',to delete a game use \'!gameDelete\'.' },
        )
        message.channel.send({ embed })
        games.forEach(item => message.channel.send(`${item.gameName}, ${item.gameType}, ${item.gameRating}, ${item.playWith}`))
    } else {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription('Incorrect usage of gameAll');
        embed.addField('Use like this:', '!gameAll');
        return message.channel.send({ embed });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
};

exports.help = {
    name: 'gameAll',
    description: 'See all games on NEO',
    usage: 'gameAll'
};
