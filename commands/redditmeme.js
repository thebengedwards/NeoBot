const Discord = require("discord.js");
const api = require("imageapi.js");
const { GetServer } = require("../functions/http-functions/servers");
const { GetAllSubreddits } = require("../functions/http-functions/subreddits");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (!options) {
                let subreddits;
                await GetAllSubreddits()
                    .then(res => subreddits = res.data.model)
                    .catch(err => subreddits = err.response.data.model);

                if (subreddits.status === 'success') {
                    const commandEmbed = require('../embeds/commandEmbed')
                    const embed = new Discord.MessageEmbed(commandEmbed)

                    let img;
                    getImg = async () => {
                        let subreddit = subreddits.resultItems[Math.floor(Math.random() * subreddits.resultItems.length)].subredditname;
                        await api(subreddit)
                            .then(res => img = res)
                            .catch(err => img);

                        if (img) {
                            if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.gif')) {
                                embed.setDescription('Random Subreddit Meme')
                                embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                                embed.setImage(img);
                                Reply(client, interaction, embed)
                            } else {
                                // Discord bot does not support mp4 types, so just run the function again
                                getImg();
                            }
                        }
                    }
                    getImg();
                } else {
                    const alertEmbed = require('../embeds/alertEmbed')
                    const embed = new Discord.MessageEmbed(alertEmbed)

                    embed.setDescription(`${subreddits.message}`)
                    Reply(client, interaction, embed)
                }
            } else {
                let subreddit = options.find(item => item.name === 'subreddit').value.toLowerCase()
                let loop = 0;
                let img;
                getImg = async () => {
                    ++loop
                    await api(subreddit)
                        .then(res => img = res)
                        .catch(err => img);

                    if (img === undefined) { // Check if subreddit exists
                        const alertEmbed = require('../embeds/alertEmbed');
                        const embed = new Discord.MessageEmbed(alertEmbed);

                        embed.setDescription('Error');
                        embed.addField('Warning', `Subreddit ${subreddit} not found`);
                        Reply(client, interaction, embed)
                    } else if (loop === 5) { // Check if returned data is image
                        const alertEmbed = require('../embeds/alertEmbed');
                        const embed = new Discord.MessageEmbed(alertEmbed);

                        embed.setDescription('Error finding meme');
                        embed.addField(`Unable to find a compatible meme in r/${subreddit}`, 'Try using another subreedit');
                        Reply(client, interaction, embed)
                    } else if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.gif')) { // Send the meme
                        const commandEmbed = require('../embeds/commandEmbed')
                        const embed = new Discord.MessageEmbed(commandEmbed)

                        embed.setDescription('Subreddit Meme')
                        embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                        embed.setImage(img);
                        Reply(client, interaction, embed)
                    } else {
                        // Discord bot does not support mp4 types, so just run the function again
                        getImg();
                    }
                }
                getImg();
            }
        }
    } catch (err) {
        console.log(err)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'redditmeme',
    description: 'Get a random meme from a subreddit',
    options: [
        { name: 'subreddit', description: 'Chose the subreddit you would like a random meme from', required: false, type: 3 },
    ]
};