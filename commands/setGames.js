import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import { CreateGame, GetAllGames, DeleteGame, UpdateGame, GetGame } from "../functions/http-functions/games.js";
import Reply from "../functions/reply.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";
import CommandEmbed from "../components/embeds/commandEmbed.js";

export const run = async (client, interaction, options) => {
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
            let embed = new MessageEmbed(CommandEmbed);
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
                        embed = new MessageEmbed(AlertEmbed)
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
                        embed = new MessageEmbed(AlertEmbed)
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
                        embed = new MessageEmbed(AlertEmbed)
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
                        embed = new MessageEmbed(AlertEmbed)
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
                        embed = new MessageEmbed(AlertEmbed)
                        embed.setDescription(`${game.message}`)
                    }
                    break;
            }
            Reply(client, interaction, embed)
        } else {
            const embed = new MessageEmbed(AlertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
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
