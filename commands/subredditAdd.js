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
            const body = {
                subredditName: args[0].toLowerCase(),
            };

            fetch(`${PATH}/subreddits`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                },
            })
                .then(res => res.json())

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Subreddit added!');
            embed.addFields(
                { name: `You have added subreddit:`, value: `r/${args[0]}` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of subredditAdd');
            embed.addField('Use like this:', '!subredditAdd <Subreddit Name>');
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
    name: 'subredditAdd',
    description: 'Add a subreddit to NEO!',
    usage: 'subredditAdd <Subreddit Name>'
};
