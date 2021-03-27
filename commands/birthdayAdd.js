const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { CreateBirthday } = require("../functions/http-functions/birthdays")
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
                fname: options.find(item => item.name === 'firstname').value.toLowerCase(),
                lname: options.find(item => item.name === 'lastname').value.toLowerCase(),
                cron: options.find(item => item.name === 'birthday').value,
                gender: options.find(item => item.name === 'gender').value.toLowerCase(),
            };

            let birthday;
            await CreateBirthday(body)
                .then(res => birthday = res.data.model)
                .catch(err => birthday = err.response.data.model);

            if (birthday.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed');
                const embed = new Discord.MessageEmbed(commandEmbed);

                embed.setDescription('Birthday added!');
                embed.addFields(
                    { name: `You have added: ${body.fname} ${body.lname} to the birthday list`, value: `Date: ${moment(body.cron).format('Do MMMM YYYY')}` },
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
    name: 'birthdayadd',
    description: 'Add a birthday to your server!',
    options: [
        { name: 'discordid', description: 'The ID od the user you would like to add', required: true, type: 3 },
        { name: 'firstname', description: 'The users first name', required: true, type: 3 },
        { name: 'lastname', description: 'The users last name', required: true, type: 3 },
        { name: 'birthday', description: 'Their birth date formatted YYYY-MM-DD', required: true, type: 3 },
        { name: 'gender', description: 'Male, Female or Other', required: true, type: 3 }
    ]
};
