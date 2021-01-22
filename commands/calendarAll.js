const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require("moment")

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
        let calendars = await fetch(`${PATH}/calendars`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API_KEY': KEY
            }
        })
            .then(res => res.json());

        calendars.sort((a,b) => {
            if(a.cron < b.cron) { return -1; }
            if(a.cron > b.cron) { return 1; }
            return 0;
        })

        const commandEmbed = require('../embeds/commandEmbed');
        const embed = new Discord.MessageEmbed(commandEmbed);

        embed.setDescription('All Calendars');
        embed.addFields(
            { name: `Below are all the calendars saved on NeoBot.`, value: `Please be carful with this information` },
            { name: `Calendars`, value: calendars.map(item => `${item.name}, ${moment(new Date(item.cron)).format('Do MMMM')} every year.`) },
            { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
        )
        message.channel.send({ embed })
    } else {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription('Incorrect usage of calendarAll');
        embed.addField('Use like this:', '!calendarAll');
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
    name: 'calendarAll',
    description: 'See all calendars on NeoBot',
    usage: 'calendarAll'
};
