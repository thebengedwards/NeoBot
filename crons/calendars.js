const Discord = require("discord.js");
const cron = require("cron");
const moment = require("moment");
const { AllServers } = require("../functions/http-functions/servers");
const { GetAllCalendars } = require("../functions/http-functions/calendars");

module.exports = async (client) => {
    let model;
    await AllServers()
        .then(res => model = res.data.model)
        .catch((err) => { console.log(err) });

    if (model.status === 'success') {
        model.resultItems.map(async (item) => {
            if (item.calendars && item.generalchannelid === client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                let calendars;
                await GetAllCalendars()
                    .then(res => calendars = res.data.model.resultItems)
                    .catch((err) => { console.log(err) });

                if (calendars) {
                    calendars.map((item2) => {
                        let calendar = moment(new Date(item2.cron)).format('DD MM')
                        let split = calendar.split(" ")

                        let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                            const eventEmbed = require('../embeds/eventEmbed')
                            const embed = new Discord.MessageEmbed(eventEmbed)

                            embed.setDescription('Calendar')
                            embed.addField(`📅 HAPPY ${item2.name.toUpperCase()} EVERYONE! 📅`, `@everyone, have a great ${item2.name}.`)
                            return client.channels.cache.get(item.generalchannelid).send({ embed });
                        });
                        event.start()
                    })
                }
            }
        })
    }
};