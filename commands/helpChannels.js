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

        embed.setDescription('Channels Information')
        embed.addFields(
            { name: 'NEO Channels are set channels that NEO specifically uses to increase functionality', value: 'This guide will explain what each channel \'type\' actually does.' },
            { name: 'Welcome', value: 'Welcome Channel where people first join. Neo monitors for new members' },
            { name: 'Mod', value: 'Moderator functions are sent to this channel. This should be a mod-only channel' },
            { name: 'General', value: 'General text channel. Polls, Birthdays and general messages are sent here. Used 90% of the time.' },
            { name: 'Memes', value: 'Memes are sent here' },
            { name: 'Game', value: 'Game Updates are sent here' },
            { name: 'Update', value: 'NEO Updates are sent here' },
            { name: 'What if my server has less than 6 channels?', value: 'Do not worry, you can simply assign a channel to multiple options, for example if you want memes and general on the same channel, simply use the same ID\'s when setting up the channels through NEO.' },
            { name: 'What if my server has more than 6 channels', value: 'In this case you will have to decide which channels NEO will send certain messages to and which not.' },
            { name: 'To disable a Channel simply set it to 0', value: 'Anything else will make NEO believe the Channel is active and will try to use it.' },
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
    name: 'helpChannels',
    description: 'Provides information about channels',
    usage: 'helpChannels'
};