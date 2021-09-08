const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { GetServer } = require("../functions/http-functions/servers");
const { CreateBirthday, GetAllBirthdays, DeleteBirthday, UpdateBirthday, GetBirthday } = require("../functions/http-functions/birthdays");
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
        let birthdayData = options[0].options;

        if (model.status === 'success') {
            const body = {
                serverid: interaction.guild_id,
                discordid: (type !== 'all') ? birthdayData.find(item => item.name === 'user').value : null,
                fname: (type === 'add' || type === 'update') ? birthdayData.find(item => item.name === 'firstname').value.toLowerCase() : null,
                lname: (type === 'add' || type === 'update') ? birthdayData.find(item => item.name === 'lastname').value.toLowerCase() : null,
                cron: (type === 'add' || type === 'update') ? birthdayData.find(item => item.name === 'birthday').value : null,
                gender: (type === 'add' || type === 'update') ? birthdayData.find(item => item.name === 'gender').value.toLowerCase() : null,
            };

            let birthday;
            let embed = new MessageEmbed(commandEmbed);
            switch (type) {
                case 'add':
                    await CreateBirthday(body)
                        .then(res => birthday = res.data.model)
                        .catch(err => birthday = err.response.data.model)

                    if (birthday.status === 'success') {
                        embed.setDescription(`Add Birthday`);
                        embed.addFields(
                            { name: `You have added: ${body.fname} ${body.lname} to the birthday list`, value: `Date: ${moment(body.cron).format('Do MMMM YYYY')}` },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${birthday.message}`)
                    }
                    break;
                case 'all':
                    await GetAllBirthdays(body)
                        .then(res => birthday = res.data.model)
                        .catch(err => birthday = err.response.data.model)

                    if (birthday.status === 'success') {
                        const guild = client.guilds.resolve(interaction.guild_id)
                        birthday.resultItems.sort((a, b) => {
                            if (a.cron < b.cron) { return -1; }
                            if (a.cron > b.cron) { return 1; }
                            return 0;
                        })

                        embed.setDescription('All Birthdays');
                        embed.addFields(
                            { name: `Below are all the birthdays saved to this server.`, value: `Please be carful with this information` },
                            { name: `Birthdays for: ${guild.name}`, value: birthday.resultItems.map(item => `${item.fname} ${item.lname}, ${item.discordid}, ${moment(item.cron).format('Do MMMM YYYY')}, ${item.gender}`) },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${birthday.message}`)
                    }
                    break;
                case 'delete':
                    await DeleteBirthday(body)
                        .then(res => birthday = res.data.model)
                        .catch(err => birthday = err.response.data.model)

                    if (birthday.status === 'success') {
                        embed.setDescription('Delete Birthday');
                        embed.addFields(
                            { name: `You have deleted a birthday.`, value: `<@${body.discordid}> will no longer receive Birthday messages.` },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${birthday.message}`)
                    }
                    break;
                case 'update':
                    await UpdateBirthday(body)
                        .then(res => birthday = res.data.model)
                        .catch(err => birthday = err.response.data.model)

                    if (birthday.status === 'success') {
                        embed.setDescription('Update Birthday');
                        embed.addFields(
                            { name: `You have updated: ${body.fname} ${body.lname} on the birthday list`, value: `Date: ${moment(body.cron).format('Do MMMM YYYY')}` },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${birthday.message}`)
                    }
                    break;
                case 'view':
                    await GetBirthday(body)
                        .then(res => birthday = res.data.model)
                        .catch(err => birthday = err.response.data.model)

                    if (birthday.status === 'success') {
                        embed.setDescription('View Birthday');
                        embed.addFields(
                            { name: `Found Birthday of: ${birthday.resultItems.fname} ${birthday.resultItems.lname}`, value: `Discord ID: ${birthday.resultItems.discordid}` },
                            { name: `Birthday: ${moment(birthday.resultItems.cron).format('Do MMMM YYYY')}`, value: `Gender: ${birthday.resultItems.gender}` },
                        )
                    } else {
                        embed = new MessageEmbed(alertEmbed)
                        embed.setDescription(`${birthday.message}`)
                    }
                    break;
                default:
                    throw 'err'
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
    description: 'Manage the Birthdays on your Server!',
    enabled: true,
    name: 'setbirthdays',
    options: [
        {
            name: 'add',
            description: 'Add a Birthday to your Server',
            type: 1,
            options: [
                { name: 'user', description: 'The user you would like to add', required: true, type: 6 },
                { name: 'firstname', description: 'The users first name', required: true, type: 3 },
                { name: 'lastname', description: 'The users last name', required: true, type: 3 },
                { name: 'birthday', description: 'Their birth date formatted YYYY-MM-DD', required: true, type: 3 },
                { name: 'gender', description: 'Male, Female or Other', required: true, type: 3 }
            ]
        },
        {
            name: 'all',
            description: 'See all Birthdays on your server',
            type: 1,
        },
        {
            name: 'delete',
            description: 'Delete a Birthday on your Server',
            type: 1,
            options: [
                { name: 'user', description: 'The user you would like to add', required: true, type: 6 },
            ]
        },
        {
            name: 'update',
            description: 'Update a Birthday on your Server',
            type: 1,
            options: [
                { name: 'user', description: 'The user you would like to update', required: true, type: 6 },
                { name: 'firstname', description: 'The users first name', required: true, type: 3 },
                { name: 'lastname', description: 'The users last name', required: true, type: 3 },
                { name: 'birthday', description: 'Their birth date formatted YYYY-MM-DD', required: true, type: 3 },
                { name: 'gender', description: 'Male, Female or Other', required: true, type: 3 }
            ]
        },
        {
            name: 'view',
            description: 'View a Birthday on your server',
            type: 1,
            options: [
                { name: 'user', description: 'The user you would like to add', required: true, type: 6 },
            ]
        },
    ],
    permLevel: 3
};
