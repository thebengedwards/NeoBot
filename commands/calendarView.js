const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { ViewCalendar } = require("../functions/http-functions/calendars")
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            const body = {
                name: options.find(item => item.name === 'name').value.toLowerCase()
            };

            let calendar;
            await ViewCalendar(body)
                .then(res => calendar = res.data.model)
                .catch(err => calendar = err.response.data.model);

            if (calendar.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Calendar');
                embed.addFields(
                    { name: `Found Calendar: ${calendar.resultItems.name}`, value: `Date: ${moment(new Date(calendar.resultItems.cron)).format('Do MMMM')} every year` },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'calendaradd \ncalendarall \ncalendardelete \ncalendarview' },
                )
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${calendar.message}`)
                Reply(client, interaction, embed)
            }
        } else {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`API Error`)
        Reply(client, interaction, embed)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 5
};

exports.help = {
    name: 'calendarview',
    description: 'View a single calendar on NeoBot',
    options: [
        { name: 'name', description: 'The name of the calendar event you would like to view', required: true, type: 3 },
    ]
};
