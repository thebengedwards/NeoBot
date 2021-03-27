const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { GetAllBirthdays } = require("../functions/http-functions/birthdays")
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction,) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            let birthdays
            await GetAllBirthdays({ serverid: interaction.guild_id })
                .then(res => birthdays = res.data.model)
                .catch(err => birthdays = err.response.data.model);

            if (birthdays.status === 'success') {
                const guild = client.guilds.resolve(interaction.guild_id)
                birthdays.resultItems.sort((a, b) => {
                    if (a.cron < b.cron) { return -1; }
                    if (a.cron > b.cron) { return 1; }
                    return 0;
                })

                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('All Birthdays');
                embed.addFields(
                    { name: `Below are all the birthdays saved to this server.`, value: `Please be carful with this information` },
                    { name: `Birthdays for: ${guild.name}`, value: birthdays.resultItems.map(item => `${item.fname} ${item.lname}, ${item.discordid}, ${moment(item.cron).format('Do MMMM YYYY')}, ${item.gender}`) },
                    { name: 'More Birthday Commands:', value: 'birthdayadd \nbirthdayall \nbirthdaydelete \nbirthdayupdate \nbirthdayview' },
                )
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${birthdays.message}`)
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
    permLevel: 3
};

exports.help = {
    name: 'birthdayall',
    description: 'See all birthdays on your server',
};
