const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === message.guild.id) {
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