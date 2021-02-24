const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")
const { CreateGame } = require("../functions/http-functions/games")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length === 4) {
            const body = {
                gameName: args[0].toLowerCase().replace('_', ' '),
                gameType: args[1].toLowerCase().replace('_', ' '),
                gameRating: args[2],
                playWith: args[3],
            };

            let game
            await CreateGame(body)
                .then(res => game = res.data)
                .catch((err) => { console.log('CreateBirthday Error') });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Game added!');
            embed.addFields(
                { name: `You have added: ${args[0].toLowerCase().replace('_', ' ')} to the game list.`, value: `Game Type: ${args[1].toLowerCase().replace('_', ' ')}, Rating: ${args[2]}, Play with: ${args[3]} others.` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a game, use \'!gameAdd\', to view a game, use \'!gameView\', to see all games use \'!gameAll\', to update a game use \'!gameUpdate\',to delete a game use \'!gameDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of gameAdd');
            embed.addFields(
                { name: 'Use like this:', value: '!gameAdd <Game_Name> <Game_Type> <Rating> <Play With>' },
                { name: 'IMPORTANT:', value: 'Use \'_\' instead of [space], a parser removes this from the message' }
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
    name: 'gameAdd',
    description: 'Add a game to NeoBot.',
    usage: 'gameAdd <Game_Name> <Game_Type> <Rating> <Play With>.'
};
