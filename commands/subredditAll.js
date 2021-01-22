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
        let subreddits = await fetch(`${PATH}/subreddits`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': KEY
            }
        })
            .then(res => res.json());

        subreddits.sort((a,b) => {
            if(a.subredditName < b.subredditName) { return -1; }
            if(a.subredditName > b.subredditName) { return 1; }
            return 0;
        })

        const commandEmbed = require('../embeds/commandEmbed');
        const embed = new Discord.MessageEmbed(commandEmbed);

        embed.setDescription('All Subreddits');
        embed.addFields(
            { name: `Below are all the subreddits saved on NeoBot.`, value: `Please be carful with this information` },
            { name: `Subreddits`, value: subreddits.map(item => `r/${item.subredditName}`) },
            { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all Subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
        )
        message.channel.send({ embed })
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
    description: 'See all subreddits on NeoBot',
    usage: 'subredditAll'
};
