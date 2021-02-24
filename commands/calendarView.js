const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { ViewCalendar } = require("../functions/http-functions/calendars")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length === 1) {
            let calendarId = args[0].toLowerCase().replace(/[_]+/g, ' ')

            let calendar
            await ViewCalendar()
                .then(res => calendar = res.data)
                .catch((err) => { console.log(err) });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('View Calendar');
            embed.addFields(
                { name: `Found Calendar: ${calendar.name}`, value: `Date: ${moment(new Date(calendar.cron)).format('Do MMMM')} every year` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
            )
            return message.channel.send({ embed })
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
