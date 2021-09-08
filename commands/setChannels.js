const { MessageEmbed } = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");
const { UpdateServer } = require("../functions/http-functions/servers");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const commandEmbed = require('../components/embeds/commandEmbed');

exports.run = async (client, interaction, options) => {
    try {
        let model;
        await GetServer({ serverid: interaction.member.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        let type = options._subcommand;
        let channelId = options._hoistedOptions[0].value;

        if (model.status === 'success') {
            const body = {
                servername: model.resultItems.servername,
                serverid: model.resultItems.serverid,
                setupcomplete: model.resultItems.setupcomplete,
                adminroleid: model.resultItems.adminroleid,
                modroleid: model.resultItems.modroleid,
                memberroleid: model.resultItems.memberroleid,
                welcomechannelid: (type === 'welcome') ? channelId : model.resultItems.welcomechannelid,
                modchannelid: (type === 'mod') ? channelId : model.resultItems.modchannelid,
                generalchannelid: (type === 'general') ? channelId : model.resultItems.generalchannelid,
                memeschannelid: (type === 'memes') ? channelId : model.resultItems.memeschannelid,
                gamechannelid: (type === 'game') ? channelId : model.resultItems.gamechannelid,
                updateschannelid: (type === 'updates') ? channelId : model.resultItems.updateschannelid,
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
                const embed = new MessageEmbed(commandEmbed)

                embed.setDescription(`Channel Setup: ${type}`)
                embed.addField(`Channel ${type} has been set to:`, `${channelId}`)
                Reply(client, interaction, embed)
            } else {
                const embed = new MessageEmbed(alertEmbed)

                embed.setDescription(`${channel.message}`)
                Reply(client, interaction, embed)
            }
        } else {
            const embed = new MessageEmbed(alertEmbed)

            embed.setDescription(`${model.message}`)
            Reply(client, interaction, embed)
        }
    } catch (err) {
        console.log(err)
    }
};

exports.command = {
    description: `Manage the Channels for your Server!`,
    enabled: true,
    name: 'setchannels',
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
    ],
    permLevel: 3
};
