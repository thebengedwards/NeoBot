const Discord = require('discord.js')
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message, args) => {
    let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    }).then(res => res.json());

    if (data.serverID === message.guild.id) {
        const modID = args.join(' ');
        const body = {
            serverName: data.serverName,
            setupComplete: data.setupComplete,
            adminRoleID: data.adminRoleID,
            modRoleID: modID,
            memberRoleID: data.memberRoleID,
            welcomeChannelID: data.welcomeChannelID,
            modChannelID: data.modChannelID,
            generalChannelID: data.generalChannelID,
            memesChannelID: data.memesChannelID,
            gameUpdatesChannelID: data.gameUpdatesChannelID,
            updateLogChannelID: data.updateLogChannelID,
            weeklyMeme: data.weeklyMeme,
            birthdays: data.birthdays,
            calendar: data.calendar,
            polls: data.polls,
        }
        if (modID) {
            fetch(`${PATH}/servers/${data.serverID}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                },
            })
                .then(res => res.json())

            const commandEmbed = require('../embeds/commandEmbed')
            const embed = new Discord.MessageEmbed(commandEmbed)

            embed.setDescription('Moderator ID Setup')
            embed.addField('Moderator ID has been set to:', `${modID}`)
            return message.channel.send({ embed });
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of setModID');
            embed.addField('Use like this:', '!setModID <Mod ID here>');
            return message.channel.send({ embed });
        }
    } else {
        console.log('Error 005')
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'setModID',
    description: `Set the moderator Id for your server`,
    usage: 'setModID <Mod ID here>'
};
