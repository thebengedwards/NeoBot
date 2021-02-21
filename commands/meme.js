const Discord = require("discord.js")
const api = require("imageapi.js");
const { GetServer } = require("../functions/http-functions/servers")

const fetch = require("node-fetch")
const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        let subredditsJson = await fetch(`${PATH}/subreddits`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': KEY
            }
        })
            .then(res => res.json());

        subreddits = subredditsJson.map(item => {
            return item.subredditName;
        });

        if (args.length === 0) {
            const commandEmbed = require('../embeds/commandEmbed')
            const embed = new Discord.MessageEmbed(commandEmbed)

            let img;
            getImg = async () => {
                let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
                img = await api(subreddit);

                if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.gif')) {
                    embed.setDescription('Random Meme')
                    embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                    embed.setImage(img);
                    return message.channel.send({ embed })
                } else {
                    // Discord bot does not support mp4 types, so just run the function again
                    getImg();
                }
            }
            getImg();
        } else if (args.length === 1) {
            let loop = 0;
            let img;
            getImg = async () => {
                ++loop
                let subreddit = args.join(' ');
                img = await api(subreddit);
                
                if(img === undefined) {
                    const alertEmbed = require('../embeds/alertEmbed');
                    const embed = new Discord.MessageEmbed(alertEmbed);

                    embed.setDescription('Error');
                    embed.addField('Warning', `Subreddit ${subreddit} not found`);
                    return message.channel.send({ embed });
                } else if (loop === 5) {
                    const alertEmbed = require('../embeds/alertEmbed');
                    const embed = new Discord.MessageEmbed(alertEmbed);

                    embed.setDescription('Error finding meme');
                    embed.addField(`Unable to find a compatible meme in r/${subreddit}`, 'Try using another subreedit');
                    return message.channel.send({ embed });
                } else if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.gif')) {
                    const commandEmbed = require('../embeds/commandEmbed')
                    const embed = new Discord.MessageEmbed(commandEmbed)

                    embed.setDescription('Subreddit Meme')
                    embed.addField(`This meme is brought to you by:`, `r/${subreddit}`)
                    embed.setImage(img);
                    return message.channel.send({ embed })
                }  else {
                    // Discord bot does not support mp4 types, so just run the function again
                    getImg();
                }
            }
            getImg();
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of meme');
            embed.addField('Use like this:', '!meme or !meme [subreddit name]');
            return message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'meme',
    description: 'Get a random meme from a subreddit',
    usage: 'meme [subreedit?]'
};