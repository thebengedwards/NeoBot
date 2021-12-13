import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import { CreateSubreddit, GetAllSubreddits, DeleteSubreddit, GetSubreddit } from "../functions/http-functions/subreddits.js";
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
        let subredditData = options[0].options;

        if (model.status === 'success') {
            const body = {
                subredditname: (type !== 'all') ? subredditData.find(item => item.name === 'name').value.toLowerCase() : null,
            };

            let subreddit;
            let embed = new MessageEmbed(CommandEmbed);
            switch (type) {
                case 'add':
                    await CreateSubreddit(body)
                        .then(res => subreddit = res.data.model)
                        .catch(err => subreddit = err.response.data.model);

                    if (subreddit.status === 'success') {
                        embed.setDescription('Subreddit added!');
                        embed.addFields(
                            { name: `You have added subreddit:`, value: `r/${body.subredditname}` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(AlertEmbed)
                        embed.setDescription(`${subreddit.message}`)
                    }
                    break;
                case 'all':
                    await GetAllSubreddits()
                        .then(res => subreddit = res.data.model)
                        .catch(err => subreddit = err.response.data.model);

                    if (subreddit.status === 'success') {
                        embed.setDescription('All Subreddits');
                        embed.addFields(
                            { name: `Below are all the subreddits saved on NeoBot.`, value: `Please be carful with this information` },
                            { name: `Subreddits`, value: subreddit.resultItems.map(item => `r/${item.subredditname}`) },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(AlertEmbed)
                        embed.setDescription(`${subreddit.message}`)
                    }
                    break;
                case 'delete':
                    await DeleteSubreddit(body)
                        .then(res => subreddit = res.data.model)
                        .catch(err => subreddit = err.response.data.model);

                    if (subreddit.status === 'success') {
                        embed.setDescription('Subreddit deleted!');
                        embed.addFields(
                            { name: `You have deleted subreddit ${body.subredditname} from the subreddit list.`, value: `Subreddits can easily be re-added` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(AlertEmbed)
                        embed.setDescription(`${subreddit.message}`)
                    }
                    break;
                case 'view':
                    await GetSubreddit(body)
                        .then(res => subreddit = res.data.model)
                        .catch(err => subreddit = err.response.data.model);

                    if (subreddit.status === 'success') {
                        embed.setDescription('View Subreddit');
                        embed.addFields(
                            { name: `Found Subreddit: ${subreddit.resultItems.subredditname}`, value: `This subreddit will be used by the weekly memes function.` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(AlertEmbed)
                        embed.setDescription(`${subreddit.message}`)
                    }
                    break;
            }
            Reply(client, interaction, embed)
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Add a Subreddit to NeoBot!',
    enabled: true,
    name: 'setsubreddits',
    options: [
        {
            name: 'add',
            description: 'Add a Subreddit to NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the subreddit you would like to add', required: true, type: 3 },
            ]
        },
        {
            name: 'all',
            description: 'See all Subreddits on NeoBot',
            type: 1,
        },
        {
            name: 'delete',
            description: 'Delete a Subreddit from NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the subreddit you would like to delete', required: true, type: 3 },
            ]
        },
        {
            name: 'view',
            description: 'View a Subreddit on NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the subreddit you would like to view', required: true, type: 3 },
            ]
        },
    ],
    permLevel: 5
};
