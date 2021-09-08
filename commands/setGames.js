const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const { CreateGame, GetAllGames, DeleteGame, UpdateGame, GetGame } = require("../functions/http-functions/games");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const commandEmbed = require('../components/embeds/commandEmbed');

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        let type = options[0].name;
        let gameData = options[0].options;

        if (model.status === 'success') {
            const body = {
                gamename: (type !== 'all') ? gameData.find(item => item.name === 'name').value.toLowerCase() : null,
                gametype: (type === 'add' || type === 'update') ? gameData.find(item => item.name === 'type').value.toLowerCase() : null,
                gamerating: (type === 'add' || type === 'update') ? gameData.find(item => item.name === 'rating').value.toLowerCase() : null,
                playwith: (type === 'add' || type === 'update') ? gameData.find(item => item.name === 'playwith').value.toLowerCase() : null,
            };

            let game;
            let embed = new MessageEmbed(commandEmbed);
            switch (type) {
                case 'add':
                    await CreateGame(body)
                        .then(res => game = res.data.model)
                        .catch(err => game = err.response.data.model);

                    if (game.status === 'success') {
                        embed.setDescription('Game added!');
                        embed.addFields(
                            { name: `You have added: ${body.gamename} to the game list.`, value: `Game Type: ${body.gametype}, Rating: ${body.gamerating}, Play with: ${body.playwith} others.` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${game.message}`)
                    }
                    break;
                case 'all':
                    await GetAllGames()
                        .then(res => games = res.data.model)
                        .catch(err => games = err.response.data.model);

                    if (games.status === 'success') {
                        games.resultItems.sort((a, b) => {
                            if (a.gamename < b.gamename) { return -1; }
                            if (a.gamename > b.gamename) { return 1; }
                            return 0;
                        })

                        embed.setDescription('All Games');
                        embed.addFields(
                            { name: `Below are all the games saved on NeoBot.`, value: `Please be carful with this information` },
                            { name: `Games`, value: games.resultItems.map(item => `${item.gamename}, ${item.gametype}, ${item.gamerating}, ${item.playwith}`) },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${games.message}`)
                    }
                    break;
                case 'delete':
                    await DeleteGame(body)
                        .then(res => game = res.data.model)
                        .catch(err => game = err.response.data.model);

                    if (game.status === 'success') {
                        embed.setDescription('Game deleted!');
                        embed.addFields(
                            { name: `You have deleted game ${body.gamename} from the game list.`, value: `Game can easily be re-added` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${game.message}`)
                    }
                    break;
                case 'update':
                    await UpdateGame(body)
                        .then(res => game = res.data.model)
                        .catch(err => game = err.response.data.model);

                    if (game.status === 'success') {
                        embed.setDescription('Game Updated!');
                        embed.addFields(
                            { name: `You have updated: ${body.gamename}`, value: `Game Type: ${body.gametype}, Rating: ${body.gamerating}, Play with: ${body.playwith} others.` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${game.message}`)
                    }
                    break;
                case 'view':
                    await GetGame(body)
                        .then(res => game = res.data.model)
                        .catch(err => game = err.response.data.model);

                    if (game.status === 'success') {
                        embed.setDescription('View Game');
                        embed.addFields(
                            { name: `Found Game: ${game.resultItems.gamename}`, value: `Game Type: ${game.resultItems.gametype}, Rating: ${game.resultItems.gamerating}, Play with: ${game.resultItems.playwith} others.` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${game.message}`)
                    }
                    break;
            }
            Reply(client, interaction, embed)
        } else {
            const embed = new MessageEmbed(alertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch (err) {
        console.log(err)
    }
};

exports.command = {
    description: 'Manage the Games on NeoBot.',
    enabled: true,
    name: 'setgames',
    options: [
        {
            name: 'add',
            description: 'Add a Game to NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the game you would like to add', required: true, type: 3 },
                { name: 'type', description: 'The type of the game', required: true, type: 3 },
                { name: 'rating', description: 'The rating of the game', required: true, type: 3 },
                { name: 'playwith', description: 'The amount of other people you can play the game with', required: true, type: 3 },
            ]
        },
        {
            name: 'all',
            description: 'See all Games on NeoBot',
            type: 1,
        },
        {
            name: 'delete',
            description: 'Delete a Game from NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the game you would like to delete', required: true, type: 3 },
            ]
        },
        {
            name: 'update',
            description: 'Update a Game on NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the game you would like to update', required: true, type: 3 },
                { name: 'type', description: 'The type of the game', required: true, type: 3 },
                { name: 'rating', description: 'The rating of the game', required: true, type: 3 },
                { name: 'playwith', description: 'The amount of other people you can play the game with', required: true, type: 3 },
            ]
        },
        {
            name: 'view',
            description: 'View a Game on NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the game you would like to view', required: true, type: 3 },
            ]
        },
    ],
    permLevel: 5
};
