const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers");
const { UpdateServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.guild_id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        let type = options[0].name;
        let channelData = options[0].options[0];

        if (model.status === 'success') {
            const body = {
                servername: model.resultItems.servername,
                serverid: model.resultItems.serverid,
                setupcomplete: model.resultItems.setupcomplete,
                adminroleid: model.resultItems.adminroleid,
                modroleid: model.resultItems.modroleid,
                memberroleid: model.resultItems.memberroleid,
                welcomechannelid: (type === 'welcome') ? channelData.value : model.resultItems.welcomechannelid,
                modchannelid: (type === 'mod') ? channelData.value : model.resultItems.modchannelid,
                generalchannelid: (type === 'general') ? channelData.value : model.resultItems.generalchannelid,
                memeschannelid: (type === 'memes') ? channelData.value : model.resultItems.memeschannelid,
                gamechannelid: (type === 'game') ? channelData.value : model.resultItems.gamechannelid,
                updateschannelid: (type === 'updates') ? channelData.value : model.resultItems.updateschannelid,
                weeklymeme: model.resultItems.weeklymeme,
                birthdays: model.resultItems.birthdays,
                calendar: model.resultItems.calendar,
                polls: model.resultItems.polls,
            };

            let channel;
            await UpdateServer(body)
                .then(res => channel = res.data.model)
                .catch(err => channel = err.response.data.model);

            if (channel.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed')
                const embed = new Discord.MessageEmbed(commandEmbed)

                embed.setDescription(`Channel Setup: ${type}`)
                embed.addField(`Channel ${type} has been set to:`, `${channelData.value}`)
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${channel.message}`)
                Reply(client, interaction, embed)
            }
        } else {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription(`API Error`)
        Reply(client, interaction, embed)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'setchannels',
    description: `Manage the Channels for your Server!`,
    options: [
        {
            name: 'game',
            description: 'The Channel you want game updates being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send game updates to', required: true, type: 7 },
            ]
        },
        {
            name: 'general',
            description: 'The Channel you want general messages being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send general messages to', required: true, type: 7 },
            ]
        },
        {
            name: 'memes',
            description: 'The Channel you want memes being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send memes to', required: true, type: 7 },
            ]
        },
        {
            name: 'mod',
            description: 'The Channel you want mod messages being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send mod messages to', required: true, type: 7 },
            ]
        },
        {
            name: 'updates',
            description: 'The Channel you want updates being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send updates to', required: true, type: 7 },
            ]
        },
        {
            name: 'welcome',
            description: 'The Channel you want welcome messages being sent to',
            type: 1,
            options: [
                { name: 'name', description: 'The name of the channel you want to send welcome messages to', required: true, type: 7 },
            ]
        },
    ]
};
