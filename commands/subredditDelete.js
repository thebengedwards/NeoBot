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
            fetch(`${PATH}/subreddits/${args[0]}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                },
            })
                .then(res => res.json())

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Subreddit deleted!');
            embed.addFields(
                { name: `You have deleted subreddit ${args[0]} from the subreddit list.`, value: `Subreddits can easily be re-added` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a subreddit, use \'!subredditAdd\', to view a subreddit, use \'!subredditView\', to see all subreddits use \'!subredditAll\',to delete a subreddit use \'!subredditDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of subredditDelete');
            embed.addField('Use like this:', '!subredditDelete <Subreddit Name>');
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
    name: 'subredditDelete',
    description: 'Delete a subreddit from NEO',
    usage: 'subredditDelete <Subreddit Name>'
};
