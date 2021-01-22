const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === message.guild.id) {
        const commandEmbed = require('../embeds/commandEmbed')
        const embed = new Discord.MessageEmbed(commandEmbed)

        embed.setDescription('Events Information')
        embed.addFields(
            { name: 'NeoBot Events are time based messages that occur based on a timer', value: 'This guide will explain what each event \'type\' actually does.' },
            { name: 'WeeklyMemes', value: 'If Enabled, NeoBot will send a meme to the Memes Channel every week at 20:00 GMT on a Friday.' },
            { name: 'Birthdays', value: 'If Enabled, NeoBot will send a \'Happy Birthday\' Message into the General Channel whenever there is a birthday at 08:00 GMT.' },
            { name: 'Calendar', value: 'If Enabled, NeoBot will send a special calendar day message at 08:00 of the special day into the General Channel.' },
            { name: 'Polls', value: 'If Enabled, NeoBot will send a poll asking if anyone wants to play a specific game at 20:00 GMT on a Friday into the General Channel' },
            { name: 'What if I haven\'t set up the channels used by these functions?', value: 'They will be sent nowehere. You need to have the channels set up for these functions to work.' },
            { name: 'I have set up a channel but nothing is coming through?', value: 'It is highly likely you have set up the channel incorrectly, if you need more help use !report to rpeort the issue.' },
            { name: 'Birthdays is a customizable Event type. Use \'!birthdayAdd\' to add a birthday alert. Use like this:', value: '!birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>' },
        )
        return message.channel.send({ embed })
    } else {
        console.log('Error')
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'helpEvents',
    description: 'Provides information about events',
    usage: 'helpEvents'
};