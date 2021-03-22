const Discord = require("discord.js");
const cron = require("cron");
const moment = require("moment");
const { AllServers } = require("../functions/http-functions/servers");
const { GetAllBirthdays } = require("../functions/http-functions/birthdays");

module.exports = async (client) => {
    let model;
    await AllServers()
        .then(res => model = res.data.model)
        .catch((err) => { console.log(err) });

    if (model.status === 'success') {
        model.resultItems.map(async (item) => {
            if (item.birthdays && item.generalchannelid === client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                let birthdays;
                await GetAllBirthdays({ serverid: item.serverid })
                    .then(res => birthdays = res.data.model.resultItems)
                    .catch((err) => { console.log(err) });

                if (birthdays) {
                    birthdays.map(async (item2) => {
                        let birthday = moment(new Date(item2.cron)).format('DD MM')
                        let split = birthday.split(" ")

                        let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                            const eventEmbed = require('../embeds/eventEmbed')
                            const embed = new Discord.MessageEmbed(eventEmbed)

                            embed.setDescription('Birthday')
                            embed.addField(`🎂 ${item2.fname.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${item2.discordid}> a happy Birthday!!!`)
                            return client.channels.cache.get(item.generalchannelid).send({ embed });
                        });
                        event.start()
                    })
                }
            }
        })
    }
};