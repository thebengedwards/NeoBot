const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");
const { CreateCalendar, GetAllCalendars, DeleteCalendar, GetCalendar } = require("../functions/http-functions/calendars");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const commandEmbed = require('../components/embeds/commandEmbed');

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        let type = options[0].name;
        let channelData = options[0].options;

        if (model.status === 'success') {
            const body = {
                name: (type !== 'all') ? channelData.find(item => item.name === 'name').value.toLowerCase() : null,
                cron: (type === 'add') ? channelData.find(item => item.name === 'date').value : null,
            };

            let calendar;
            let embed = new MessageEmbed(commandEmbed);
            switch (type) {
                case 'add':
                    await CreateCalendar(body)
                        .then(res => calendar = res.data.model)
                        .catch(err => calendar = err.response.data.model);

                    if (calendar.status === 'success') {
                        embed.setDescription('Calendar added!');
                        embed.addFields(
                            { name: `You have added: ${body.name} to the calendar list.`, value: `Date: ${moment(new Date(body.cron)).format('Do MMMM')} every year` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${calendar.message}`)
                    }
                    break;
                case 'all':
                    await GetAllCalendars()
                        .then(res => calendars = res.data.model)
                        .catch(err => calendars = err.response.data.model);

                    if (calendars.status === 'success') {
                        calendars.resultItems.sort((a, b) => {
                            if (a.cron < b.cron) { return -1; }
                            if (a.cron > b.cron) { return 1; }
                            return 0;
                        })

                        embed.setDescription('All Calendars');
                        embed.addFields(
                            { name: `Below are all the calendars saved on NeoBot.`, value: `Please be carful with this information` },
                            { name: `Calendars`, value: calendars.resultItems.map(item => `${item.name}, ${moment(new Date(item.cron)).format('Do MMMM')} every year.`) },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${calendars.message}`)
                    }
                    break;
                case 'delete':
                    await DeleteCalendar(body)
                        .then(res => calendar = res.data.model)
                        .catch(err => calendar = err.response.data.model);

                    if (calendar.status === 'success') {
                        embed.setDescription('Calendar deleted!');
                        embed.addFields(
                            { name: `You have deleted calendar ${body.name} from the calendar list.`, value: `Calendar can easily be re-added` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${calendar.message}`)
                    }
                    break;
                case 'view':
                    await GetCalendar(body)
                        .then(res => calendar = res.data.model)
                        .catch(err => calendar = err.response.data.model);

                    if (calendar.status === 'success') {
                        embed.setDescription('View Calendar');
                        embed.addFields(
                            { name: `Found Calendar: ${calendar.resultItems.name}`, value: `Date: ${moment(new Date(calendar.resultItems.cron)).format('Do MMMM')} every year` },
                            { name: 'This command is dev only', value: 'DO NOT USE IT' },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${calendar.message}`)
                    }
                    break;
            }
            Reply(client, interaction, embed)
        } else {
            const embed = new MessageEmbed(alertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch (err) {
        console.log(err)
    }
};

exports.command = {
    description: 'Manage the Calendars on NeoBot!',
    enabled: true,
    name: 'setcalendars',
    options: [
        {
            name: 'add',
            description: 'Add a Calendar to NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the calendar event you would like to add', required: true, type: 3 },
                { name: 'date', description: 'The date of the calendar event formatted MM-DD', required: true, type: 3 },
            ]
        },
        {
            name: 'all',
            description: 'See all Calendars on NeoBot',
            type: 1,
        },
        {
            name: 'delete',
            description: 'Delete a Calendar from NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the calendar event you would like to delete', required: true, type: 3 },
            ]
        },
        {
            name: 'view',
            description: 'View a Calendar on NeoBot',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the calendar event you would like to view', required: true, type: 3 },
            ]
        },
    ],
    permLevel: 5
};
