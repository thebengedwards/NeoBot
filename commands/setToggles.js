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

        if (model.status === 'success') {
            let boolean;
            if (type === 'weeklymeme') {
                boolean = !model.resultItems.weeklymeme
            } else if (type === 'birthdays') {
                boolean = !model.resultItems.birthdays
            } else if (type === 'calendar') {
                boolean = !model.resultItems.calendar
            } else if (type === 'polls') {
                boolean = !model.resultItems.polls
            } else if (type === 'profanities') {
                boolean = !model.resultItems.profanities
            } else {
                boolean = false
            }
            const body = {
                servername: model.resultItems.servername,
                serverid: model.resultItems.serverid,
                setupcomplete: model.resultItems.setupcomplete,
                adminroleid: model.resultItems.adminroleid,
                modroleid: model.resultItems.modroleid,
                memberroleid: model.resultItems.memberroleid,
                welcomechannelid: model.resultItems.welcomechannelid,
                modchannelid: model.resultItems.modchannelid,
                generalchannelid: model.resultItems.generalchannelid,
                memeschannelid: model.resultItems.memeschannelid,
                gamechannelid: model.resultItems.gamechannelid,
                updateschannelid: model.resultItems.updateschannelid,
                weeklymeme: (type === 'weeklymeme') ? !model.resultItems.weeklymeme : model.resultItems.weeklymeme,
                birthdays: (type === 'birthdays') ? !model.resultItems.birthdays : model.resultItems.birthdays,
                calendar: (type === 'calendar') ? !model.resultItems.calendar : model.resultItems.calendar,
                polls: (type === 'polls') ? !model.resultItems.polls : model.resultItems.polls,
                profanities: (type === 'profanities') ? !model.resultItems.profanities : model.resultItems.profanities
            }

            let toggle;
            await UpdateServer(body)
                .then(res => toggle = res.data.model)
                .catch(err => toggle = err.response.data.model);

            if (toggle.status === 'success') {
                const commandEmbed = require('../embeds/commandEmbed')
                const embed = new Discord.MessageEmbed(commandEmbed)

                embed.setDescription(`Toggle: ${type}`)
                embed.addField(`Toggle ${type} have been set to:`, boolean ? `Enabled 🟩` : `Disabled 🟥`,)
                Reply(client, interaction, embed)
            } else {
                const alertEmbed = require('../embeds/alertEmbed')
                const embed = new Discord.MessageEmbed(alertEmbed)

                embed.setDescription(`${toggle.message}`)
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
    name: 'settoggles',
    description: `Turn Toggles On or Off`,
    options: [
        {
            name: 'weeklymeme',
            description: 'Enable/Disable Weekly Memes',
            type: 1,
        },
        {
            name: 'birthdays',
            description: 'Enable/Disable Birthday Alerts',
            type: 1,
        },
        {
            name: 'calendar',
            description: 'Enable/Disable Calendar Alerts',
            type: 1,
        },
        {
            name: 'polls',
            description: 'Enable/Disable Weekly Polls',
            type: 1,
        },
        {
            name: 'profanities',
            description: 'Enable/Disable Profanity filtering',
            type: 1,
        },
    ]
};
