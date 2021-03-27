const Discord = require("discord.js")
const { GetServer, UpdateServer } = require("../functions/http-functions/servers");

exports.run = async (client, message, args) => {
    try {
        let model;
        await GetServer({ serverid: message.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === message.guild.id) {
                const channelID = args.join(' ');
                const body = {
                    servername: model.resultItems.servername,
                    serverid: model.resultItems.serverid,
                    setupcomplete: model.resultItems.setupcomplete,
                    adminroleid: model.resultItems.adminroleid,
                    modroleid: model.resultItems.modroleid,
                    memberroleid: model.resultItems.memberroleid,
                    welcomechannelid: model.resultItems.welcomechannelid,
                    modchannelid: channelID,
                    generalchannelid: model.resultItems.generalchannelid,
                    memeschannelid: model.resultItems.memeschannelid,
                    gamechannelid: model.resultItems.gamechannelid,
                    updateschannelid: model.resultItems.updateschannelid,
                    weeklymeme: model.resultItems.weeklymeme,
                    birthdays: model.resultItems.birthdays,
                    calendar: model.resultItems.calendar,
                    polls: model.resultItems.polls,
                }
                if (channelID) {
                    let updateModel;
                    await UpdateServer(body)
                        .then(res => updateModel = res.data.model)
                        .catch(err => updateModel = err.response.data.model);
                    
                    if (updateModel.status === 'success') {
                        const commandEmbed = require('../embeds/commandEmbed')
                        const embed = new Discord.MessageEmbed(commandEmbed)

                        embed.setDescription('Mod Channel Setup')
                        embed.addField('Mod Channel has been set to:', `${channelID}`)
                        return message.channel.send({ embed });
                    } else {
                        const alertEmbed = require('../embeds/alertEmbed');
                        const embed = new Discord.MessageEmbed(alertEmbed);

                        embed.setDescription('Error updating Mod Channel');
                        embed.addField('Message', `${updateModel.message}`);
                        return message.channel.send({ embed });
                    }
                } else {
                    const alertEmbed = require('../embeds/alertEmbed');
                    const embed = new Discord.MessageEmbed(alertEmbed);

                    embed.setDescription('Incorrect usage of setModChannel');
                    embed.addField('Use like this:', '!setModChannel <Channel ID here>');
                    return message.channel.send({ embed });
                }
            }
        }
    } catch {
        console.log('Error connecting to API')
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'setModChannel',
    description: `Set the Mod Channel for your server`,
    usage: 'setModChannel <Channel ID here>'
};