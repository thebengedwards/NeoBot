const Discord = require("discord.js")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async(client, message) => {
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

        embed.setDescription('Roles Information')
        embed.addFields(
            { name: 'NEO Roles are set roles that NEO uses to control who can use what functions', value: 'This guide will explain what each role has access to.' },
            { name: 'Admin', value: 'Has Acces to all functions' },
            { name: 'Mods', value: 'Has Access to most fucntions' },
            { name: 'Members', value: 'Only has access to safe functions' },
            { name: 'What if my server has less than 3 roles?', value: 'Worry not, if you configure any role ID with the same role ID used for another role, NEO will simply default to the most dominant role. In short, dont worry about it, jsut assigne everyone the member role.' },
            { name: 'What if my server has more than 3 roles?', value: 'In this case you will have to: either remove some roles, or set the three roles you would like people to have to access the bot, then assign those roles accordingly. Be carful when doing this, as you dont want the wrong people accessing NEO.' },
            { name: 'To disable a Role simply set it to 0', value: 'Anything else will make NEO believe the Role is active and will try to use it.' },
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
    name: 'helpRoles',
    description: 'Provides information about roles',
    usage: 'helpRoles'
};