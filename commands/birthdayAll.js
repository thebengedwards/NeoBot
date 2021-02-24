const Discord = require("discord.js")
const moment = require("moment")
const { GetServer } = require("../functions/http-functions/servers")
const { GetAllBirthdays } = require("../functions/http-functions/birthdays")

exports.run = async (client, message) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        let birthdays
        await GetAllBirthdays(message.guild.id)
            .then(res => birthdays = res.data)
            .catch((err) => { console.log('GetAllBirthdays Error') });

        birthdays.sort((a, b) => {
            if (a.cron < b.cron) { return -1; }
            if (a.cron > b.cron) { return 1; }
            return 0;
        })

        const commandEmbed = require('../embeds/commandEmbed');
        const embed = new Discord.MessageEmbed(commandEmbed);

        embed.setDescription('All Birthdays');
        embed.addFields(
            { name: `Below are all the birthdays saved to this server.`, value: `Please be carful with this information` },
            { name: `Birthdays for: ${message.guild.name}`, value: birthdays.map(item => `${item.fName} ${item.lName}, ${item.discordID}, ${moment(item.cron).format('Do MMMM YYYY')}, ${item.gender}`) },
            { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayView\', to delete a birthday use \'!birthdayDelete\'.' },
        )
        message.channel.send({ embed })
    } else {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription('Incorrect usage of birthdayDelete');
        embed.addField('Use like this:', '!birthdayDelete <DiscordID>');
        return message.channel.send({ embed });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'birthdayAll',
    description: 'See all birthdays on your server',
    usage: 'birthdayAll'
};
