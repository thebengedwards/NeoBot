const Discord = require("discord.js");
const moment = require("moment");
const settings = require("../settings.json");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (guild) => {
    let model;
    await GetServer({serverid: guild.id})
        .then(res => model = res.data.model.resultItems)
        .catch((err) => { console.log(err) });

    if (model.serverid === guild.id) {
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