const Discord = require("discord.js")
const fetch = require("node-fetch")
const moment = require("moment")
const settings = require("../settings.json")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = guild => {
    let data = await fetch(`${PATH}/servers/${guild.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        }
    })
        .then(res => res.json());

    if (data.serverID === guild.id) {
        const alertEmbed = require('../embeds/alertEmbed');
        const embed = new Discord.MessageEmbed(alertEmbed);

        embed.setDescription(`Server Outage`)
        embed.addFields(
            { name: `${guild.name} is Unavailable`, value: `Server ID: ${guild.id}` },
            { name: `Outage started on: ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}`, value: `Please notify any affected users.`}
        )

        return client.users.fetch(settings.reportid, false).then((user) => {
            user.send({ embed });
        });
    }
};