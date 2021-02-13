const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")
const { DeleteBirthday } = require("../functions/http-functions/birthdays")

exports.run = async(client, message, args) => {
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
            await DeleteBirthday(message.guild.id, body)
            .then(res => birthday = res.data)
            .catch((err) => { console.log('BirthdayDelete Error') });

            const commandEmbed = require('../embeds/commandEmbed');
            const embed = new Discord.MessageEmbed(commandEmbed);

            embed.setDescription('Birthday deleted!');
            embed.addFields(
                { name: `You have deleted user <@${args[0]}> from the birthday list.`, value: `Birthday messages will no longer be sent.` },
                { name: 'To see all birthdays on your server, use \'!birthdayAll\'. It will be sent to the mod channel.', value: 'To add a birthday, use \'!birthdayAdd\', to update a birthday, use \'!birthdayUpdate\', to see a birthday use \'!birthdayView\', to delete a birthday use \'!birthdayDelete\'.' },
            )
            return message.channel.send({ embed })
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of birthdayDelete');
            embed.addField('Use like this:', '!birthdayDelete <DiscordID>');
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
    name: 'birthdayDelete',
    description: 'Delete a birthday from your server',
    usage: 'birthdayDelete <DiscordID>'
};
