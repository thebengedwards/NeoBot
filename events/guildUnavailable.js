const Discord = require("discord.js");
const moment = require("moment");
const settings = require("../settings.json");

module.exports = async (guild) => {
    try {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription(`Server Outage`)
        embed.addFields(
            { name: `${guild.name} is Unavailable`, value: `Server ID: ${guild.id}` },
            { name: `Outage started on: ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}`, value: `Please notify any affected users.` }
        )
        return client.users.fetch(settings.reportid, false).then((user) => {
            user.send({ embed });
        });
    } catch {
        console.log('Error connecting to API')
    }
};