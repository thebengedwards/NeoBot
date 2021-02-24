const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { CreateCalendar } = require("../functions/http-functions/calendars")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length === 2) {
            const body = {
                name: args[0].toLowerCase().replace(/[_]+/g, ' '),
                cron: args[1],
            };

            let calendar
            await CreateCalendar(body)
                .then(res => calendar = res.data)
                .catch((err) => { console.log('CreateCalendar Error') });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Calendar added!');
            embed.addFields(
                { name: `You have added: ${calendar.name} to the calendar list.`, value: `Date: ${moment(new Date(calendar.cron)).format('Do MMMM')} every year` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of calendarAdd');
            embed.addFields(
                { name: 'Use like this:', value: '!calendarAdd <Name> <MM-DD>' },
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
    name: 'calendarAdd',
    description: 'Add a calendar to NeoBot.',
    usage: 'calendarAdd <Name> <MM-DD>'
};
