const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")
const { DeleteCalendar } = require("../functions/http-functions/calendars")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
    .then(res => server = res.data)
    .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length === 1) {
            let calendarId = args[0].toLowerCase().replace(/[_]+/g, ' ')

            let calendar
            await DeleteCalendar(calendarId)
            .then(res => calendar = res.data)
            .catch((err) => { console.log('CalendarDelete Error') });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Calendar deleted!');
            embed.addFields(
                { name: `You have deleted calendar ${args[0]} from the calendar list.`, value: `Calendar can easily be re-added` },
                { name: 'This command is dev only. DO NOT USE IT', value: 'To add a calendar, use \'!calendarAdd\', to view a calendar, use \'!calendarView\', to see all calendars use \'!calendarAll\',to delete a calendar use \'!calendarDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of calendarDelete');
            embed.addFields(
                { name: 'Use like this:', value: '!calendarDelete <Name>' },
                { name: 'IMPORTANT:', value: 'Use \'_\' instead of [space], a parser removes this from the message' },
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
    name: 'calendarDelete',
    description: 'Delete a calendar from NeoBot',
    usage: 'calendarDelete <Name>'
};
