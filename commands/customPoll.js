const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")

exports.run = async (client, message, args) => {
    let server
    await GetServer(message.guild.id)
        .then(res => server = res.data)
        .catch((err) => { console.log('GetServer Error') });

    if (server.serverID === message.guild.id) {
        if (args.length > 0) {
            const messageText = args.join(' ');

            const pollEmbed = require('../embeds/pollEmbed')
            const embed = new Discord.MessageEmbed(pollEmbed)

            embed.setDescription('Custom poll')
            embed.addFields(
                { name: messageText, value: `Reply below` },
                { name: '\u200B', value: '---VOTES---' },
                { name: 'YES', value: `None`, inline: true },
                { name: 'NO', value: `None`, inline: true },
                { name: `↓ Vote Below ↓`, value: `👍 = Yes || 👎 = No` },
            )

            let embedMessage = await message.channel.send({ embed });
            await embedMessage.react('👍')
            await embedMessage.react('👎')
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of customPoll');
            embed.addField('Use like this:', '!customPoll <Poll Text Here>');
            return message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'customPoll',
    description: 'A custom poll',
    usage: 'customPoll [Poll Text Here]'
};