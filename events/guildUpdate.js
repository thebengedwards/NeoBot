const Discord = require("discord.js");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = async (client, oldGuild, newGuild) => {
    let data = await fetch(`${PATH}/servers/${oldGuild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === oldGuild.id && data.modChannelID !== '0') {
        const eventEmbed = require('../embeds/eventEmbed')
        const embed = new Discord.MessageEmbed(eventEmbed)

        embed.setDescription('Server Update')
        embed.addFields(
            { name: 'The Server has been updated', value: `Details are listed below.` },
            { name: 'Server Name', value: oldGuild.name === newGuild.name ? `${oldGuild.name}` : `${newGuild.name}` },
            { name: '\u200B', value: `---INACTIVITY---` },
            { name: 'Inactive Channel ID', value: oldGuild.afkChannelID === newGuild.afkChannelID ? `${oldGuild.afkChannelID}` : `${newGuild.afkChannelID}`, inline: true },
            { name: 'Inactive Timeout', value: oldGuild.afkTimeout === newGuild.afkTimeout ? `${oldGuild.afkTimeout} seconds` : `${newGuild.afkTimeout} seconds`, inline: true },
            { name: '\u200B', value: `---SYSTEM---` },
            { name: 'System Message Channel ID', value: oldGuild.systemChannelID === newGuild.systemChannelID ? `${oldGuild.systemChannelID}` : `${newGuild.systemChannelID}`, inline: true },
            { name: '\u200B', value: `---NOTIFICATIONS---` },
            { name: 'Default Notification Settings', value: oldGuild.defaultMessageNotifications === newGuild.defaultMessageNotifications ? `${oldGuild.defaultMessageNotifications}` : `${newGuild.defaultMessageNotifications}`, inline: true },
            { name: '\u200B', value: `---MODERATION---` },
            { name: 'Verification Level', value: oldGuild.verificationLevel === newGuild.verificationLevel ? `${oldGuild.verificationLevel}` : `${newGuild.verificationLevel}`, inline: true },
            { name: '\u200B', value: `---FEATURES---` },
            { name: 'Active Features', value: oldGuild.features === newGuild.features ? `${oldGuild.features.toString()}` : `${newGuild.features.toString()}`, inline: true },
            { name: '\u200B', value: `---WIDGET---` },
            { name: 'Widget Enabled', value: oldGuild.widgetEnabled === newGuild.widgetEnabled ? `${oldGuild.widgetEnabled}` : `${newGuild.widgetEnabled}`, inline: true },
        )
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
