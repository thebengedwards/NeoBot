const Discord = require('discord.js')
const fetch = require('node-fetch')
const moment = require('moment')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    if (data.serverID === message.guild.id) {
        if (args.length === 1) {
            const body = {
                discordID: args[0],
            };
            let birthday = await fetch(`${PATH}/birthday/${message.guild.id}`, {
                method: 'GET',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            }).then(res => res.json());

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('All Birthdays');
            embed.addFields(
                { name: `Found Birthday of: ${birthday.fName} ${birthday.lName}`, value: `Discord ID: ${birthday.discordID}` },
                { name: `Birthday: ${birthday.cron}`, value: `Gender: ${birthday.gender}` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayGet\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayGet');
            embed.addField('Use like this:', '!birthdayGet <DiscordID>');
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
    name: 'birthdayGet',
    description: 'View a single birthday on your server',
    usage: 'birthdayGet'
};
