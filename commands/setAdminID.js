const Discord = require('discord.js')
const settings = require('../settings.json')

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
        const adminID = args.join(' ');
        const body = {
            adminRoleID: adminID,
        }
        if (adminID) {
            fetch(`${PATH}/servers/${data.serverID}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'API_KEY': KEY
                },
            })
                .then(res => res.json())
        } else {
            const alertEmbed = require('../embeds/alertEmbed');
            const embed = new Discord.MessageEmbed(alertEmbed);

            embed.setDescription('Incorrect usage of setAdminID');
            embed.addField('Use like this:', '!setAdminID <Admin ID here>');
            return message.channel.send({ embed });
        }
    } else {
        console.log('Error 004')
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'setAdminID',
    description: `Set the admin Id for ${message.guild.name}`,
    usage: 'setAdminID <Admin ID here>'
};
