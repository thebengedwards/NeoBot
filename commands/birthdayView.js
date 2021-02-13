const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { ViewBirthday } = require("../functions/http-functions/birthdays")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
    .then(res => server = res.data)
    .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length === 1) {
            const body = {
                discordID: args[0],
            };

            let birthday
            await ViewBirthday(message.guild.id, body)
            .then(res => birthday = res.data)
            .catch((err) => { console.log('BirthdayView Error') });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('View Birthday');
            embed.addFields(
                { name: `Found Birthday of: ${birthday.fName} ${birthday.lName}`, value: `Discord ID: ${birthday.discordID}` },
                { name: `Birthday: ${moment(birthday.cron).format('Do MMMM YYYY')}`, value: `Gender: ${birthday.gender}` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayView\', to delete a birthday use \'!birthdayDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayView');
            embed.addField('Use like this:', '!birthdayView <DiscordID>');
            return message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'birthdayView',
    description: 'View a single birthday on your server',
    usage: 'birthdayView'
};
