const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async(client, message, args) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    if (data.serverID === message.guild.id) {
        if (args.length === 1) {
            let subreddit;
            await fetch(`${PATH}/subreddits/"${args[0].toLowerCase()}"`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json())
                .then(json => subreddit = json);

            if (subreddit.message) {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Subreddit');
                embed.addFields(
                    { name: `${subreddit.message}`, value: `Please try again.` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
                )
                return message.channel.send({ embed })
            } else {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Subreddit');
                embed.addFields(
                    { name: `Found Subreddit: ${subreddit.subredditName}`, value: `This subreddit will be used by the weekly memes function.` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
                )
                return message.channel.send({ embed })
            }
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of subredditView');
            embed.addField('Use like this:', '!subredditView <Subreddit Name>');
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
    name: 'subredditView',
    description: 'View a single subreddit on NEO',
    usage: 'subredditView'
};
