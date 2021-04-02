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
        let roleData = options[0].options[0];

        if (model.status === 'success') {
            const body = {
                servername: model.resultItems.servername,
                serverid: model.resultItems.serverid,
                setupcomplete: model.resultItems.setupcomplete,
                adminroleid: (type === 'admin') ? roleData.value : model.resultItems.adminroleid,
                modroleid: (type === 'mod') ? roleData.value : model.resultItems.modroleid,
                memberroleid: (type === 'member') ? roleData.value : model.resultItems.memberroleid,
                welcomechannelid: model.resultItems.welcomechannelid,
                modchannelid: model.resultItems.modchannelid,
                generalchannelid: model.resultItems.generalchannelid,
                memeschannelid: model.resultItems.memeschannelid,
                gamechannelid: model.resultItems.gamechannelid,
                updateschannelid: model.resultItems.updateschannelid,
                weeklymeme: model.resultItems.weeklymeme,
                birthdays: model.resultItems.birthdays,
                calendar: model.resultItems.calendar,
                polls: model.resultItems.polls,
            };

            let role;
            await UpdateServer(body)
                .then(res => role = res.data.model)
                .catch(err => role = err.response.data.model);

            if (role.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed')
                const embed = new Discord.MessageEmbed(commandEmbed)

                embed.setDescription(`Role Setup: ${type}`)
                embed.addField(`Role ${type} has been set to:`, `${roleData.value}`)
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${role.message}`)
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
    name: 'setrole',
    description: `Manage the Roles of your Server!`,
    options: [
        {
            name: 'admin',
            description: 'The Admin role of your Server',
            type: 1,
            options: [
                { name: 'role', description: 'The Role you would like to set as Admin', required: true, type: 8 },
            ]
        },
        {
            name: 'mod',
            description: 'The Mod role of your Server',
            type: 1,
            options: [
                { name: 'role', description: 'The name of the channel you want to send general messages to', required: true, type: 8 },
            ]
        },
        {
            name: 'member',
            description: 'The Member role of your Server',
            type: 1,
            options: [
                { name: 'role', description: 'The name of the channel you want to send memes to', required: true, type: 8 },
            ]
        },
    ]
};
