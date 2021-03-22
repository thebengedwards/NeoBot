const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldGuild, newGuild) => {
    let model;
    await GetServer({serverid: oldGuild.id})
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === oldGuild.id && newGuild.channels.cache.find(item => item.id === model.modchannelid)) {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Server Update')
        embed.addFields(
            { name: 'The Server has been updated', value: `Details are listed below.` },
            { name: 'Server Name', value: `${newGuild.name}` },
            { name: '\u200B', value: `---INACTIVITY---` },
            { name: 'Inactive Channel Name', value: newGuild.afkChannelID !== null ? `${newGuild.channels.cache.find(item => item.id === newGuild.afkChannelID).name}` : `No Inactive Channel set`, inline: true },
            { name: 'Inactive Channel ID', value: newGuild.afkChannelID !== null ? `${newGuild.afkChannelID}` : `No Inactive Channel set`, inline: true },
            { name: 'Inactive Timeout', value: `${newGuild.afkTimeout} seconds`, inline: true },
            { name: '\u200B', value: `---SYSTEM---` },
            { name: 'System Message Channel Name', value: newGuild.systemChannelID !== null ? `${newGuild.channels.cache.find(item => item.id === newGuild.systemChannelID).name}` : `No System Message Channel Set`, inline: true },
            { name: 'System Message Channel ID', value: newGuild.systemChannelID !== null ? `${newGuild.systemChannelID}` : `No System Message Channel Set`, inline: true },
            { name: '\u200B', value: `---NOTIFICATIONS---` },
            { name: 'Default Notification Settings', value: `${newGuild.defaultMessageNotifications}`, inline: true },
            { name: '\u200B', value: `---MODERATION---` },
            { name: 'Verification Level', value: `${newGuild.verificationLevel}`, inline: true },
            { name: '\u200B', value: `---FEATURES---` },
            { name: 'Active Features', value: `${newGuild.features.toString()}`, inline: true },
            { name: '\u200B', value: `---WIDGET---` },
            { name: 'Widget Enabled', value: `${newGuild.widgetEnabled}`, inline: true },
        )
        return client.channels.cache.get(model.modchannelid).send({ embed });
    }
};
