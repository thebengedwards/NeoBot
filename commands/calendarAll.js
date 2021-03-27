const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { GetAllCalendars } = require("../functions/http-functions/calendars")
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            let calendars;
            await GetAllCalendars()
                .then(res => calendars = res.data.model)
                .catch(err => calendars = err.response.data.model);

            if (calendars.status === 'success') {
                calendars.resultItems.sort((a, b) => {
                    if (a.cron < b.cron) { return -1; }
                    if (a.cron > b.cron) { return 1; }
                    return 0;
                })

                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('All Calendars');
                embed.addFields(
                    { name: `Below are all the calendars saved on NeoBot.`, value: `Please be carful with this information` },
                    { name: `Calendars`, value: calendars.resultItems.map(item => `${item.name}, ${moment(new Date(item.cron)).format('Do MMMM')} every year.`) },
                    { name: 'This command is dev only. DO NOT USE IT', value: 'calendaradd \ncalendarall \ncalendardelete \ncalendarview' },
                )
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${calendars.message}`)
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
    name: 'calendarall',
    description: 'See all calendars on NeoBot',
};
