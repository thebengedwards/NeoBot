const Discord = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')

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
        if (args.length === 5) {
            const body = {
                serverID: message.guild.id,
                discordID: args[0],
                fName: args[1].toLowerCase(),
                lName: args[2].toLowerCase(),
                cron: args[3],
                gender: args[4].toLowerCase(),
            };

            fetch(`${PATH}/birthdays/${message.guild.id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                },
            })
                .then(res => res.json())

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Birthday Updated!');
            embed.addFields(
                { name: `You have updated: ${args[1]} ${args[2]} on the birthday list`, value: `Date: ${moment(args[3]).format('Do MMMM YYYY')}` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayGet\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayUpdate');
            embed.addField('Use like this:', '!birthdayUpdate <DiscordID of the user you want to update> <First Name> <Last Name> <YYYY-MM-DD> <Gender>');
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
    name: 'birthdayUpdate',
    description: 'Update a birthday on your server.',
    usage: 'birthdayUpdate <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>'
};
