const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async(client, message) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    if (data.serverID === message.guild.id) {
        let subreddits = await fetch(`${PATH}/subreddits`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': KEY
            }
        })
            .then(res => res.json());

        const commandEmbed = require('../embeds/commandEmbed');
        const embed = new Discord.MessageEmbed(commandEmbed);

        embed.setDescription('All Subreddits');
        embed.addFields(
            { name: `Below are all the subreddits saved on NEO.`, value: `Please be carful with this information` },
            { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all Subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
        )
        message.channel.send({ embed })
        subreddits.forEach(item => message.channel.send(`${item.subredditName}`))
    } else {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription('Incorrect usage of subredditAll');
        embed.addField('Use like this:', '!subredditAll');
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
    name: 'subredditAll',
    description: 'See all subreddits on NEO',
    usage: 'subredditAll'
};
