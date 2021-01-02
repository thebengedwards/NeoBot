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
        return client.channels.cache.get(data.modChannelID).send({ embed });
    }
};
