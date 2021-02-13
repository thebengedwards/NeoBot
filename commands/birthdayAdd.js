const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { CreateBirthday } = require("../functions/http-functions/birthdays")

exports.run = async(client, message, args) => {
    let server
    await GetServer(message.guild.id)
    .then(res => server = res.data)
    .catch((err) => {console.log('GetServer Error')});

    if (server.serverID === message.guild.id) {
        if (args.length === 5) {
            const body = {
                serverID: message.guild.id,
                discordID: args[0],
                fName: args[1].toLowerCase(),
                lName: args[2].toLowerCase(),
                cron: args[3],
                gender: args[4].toLowerCase(),
            };

            let birthday
            await CreateBirthday(body)
            .then(res => birthday = res.data)
            .catch((err) => {console.log('CreateBirthday Error')});

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Birthday added!');
            embed.addFields(
                { name: `You have added: ${birthday.fName} ${birthday.lName} to the birthday list`, value: `Date: ${moment(birthday.cron).format('Do MMMM YYYY')}` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayView\', to delete a birthday use \'!birthdayDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayAdd');
            embed.addField('Use like this:', '!birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>');
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
    name: 'birthdayAdd',
    description: 'Add a birthday to your server!',
    usage: 'birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>'
};
