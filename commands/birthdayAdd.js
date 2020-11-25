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
        if (args.length !== 5) {
            const body = {
                serverID: message.guild.id,
                discordID: args[0],
                fName: args[1],
                lName: args[2],
                cron: args[3],
                gender: args[4],
            };

            fetch(`${PATH}/birthdays`, {
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

            embed.setDescription('Birthday added!');
            embed.addFields(
                { name: `You have added: ${args[1]} ${args[2]} to the birthday list`, value: `Date: ${args[3]}` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To remove a birthday, use \'!birthdayDelete\'' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayAdd');
            embed.addField('Use like this:', '!birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>');
            return message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'birthdayAdd',
    description: 'Add a birthday to your server!',
    usage: 'birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>'
};
