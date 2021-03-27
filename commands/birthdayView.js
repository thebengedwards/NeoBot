const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { ViewBirthday } = require("../functions/http-functions/birthdays")
const { Reply } = require("../functions/helpers")

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            const body = {
                serverid: interaction.guild_id,
                discordid: options.find(item => item.name === 'discordid').value,
            };

            let birthday;
            await ViewBirthday(body)
                .then(res => birthday = res.data.model)
                .catch(err => birthday = err.response.data.model);

            if (birthday.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('View Birthday');
                embed.addFields(
                    { name: `Found Birthday of: ${birthday.resultItems.fname} ${birthday.resultItems.lname}`, value: `Discord ID: ${birthday.resultItems.discordid}` },
                    { name: `Birthday: ${moment(birthday.resultItems.cron).format('Do MMMM YYYY')}`, value: `Gender: ${birthday.resultItems.gender}` },
                    { name: 'More Birthday Commands:', value: 'birthdayadd \nbirthdayall \nbirthdaydelete \nbirthdayupdate \nbirthdayview' },
                )
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${birthday.message}`)
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
    name: 'birthdayview',
    description: 'View a single birthday on your server',
    options: [
        { name: 'discordid', description: 'The ID od the user you would like to view', required: true, type: 3 }
    ]
};
