const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require("moment")

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
            let calendar;
            await fetch(`${PATH}/calendars/"${args[0].toLowerCase().replace('_', ' ')}"`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                }
            })
                .then(res => res.json())
                .then(json => calendar = json);

            if (calendar.message) {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Calendar');
                embed.addFields(
                    { name: `${calendar.message}`, value: `Please try again.` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
                )
                return message.channel.send({ embed })
            } else {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Calendar');
                embed.addFields(
                    { name: `Found Calendar: ${calendar.name}`, value: `Date: ${moment(new Date(calendar.cron)).format('Do MMMM')} every year` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
                )
                return message.channel.send({ embed })
            }
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of calendarView');
            embed.addFields(
                { name: 'Use like this:', value: '!calendarView <Name>' },
                { name: 'IMPORTANT:', value: 'Use \'_\' instead of [space], a parser removes this from the message' }
            )
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
    name: 'calendarView',
    description: 'View a single calendar on NeoBot',
    usage: 'calendarView <Name>'
};
