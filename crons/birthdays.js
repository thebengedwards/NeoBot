import { MessageEmbed } from "discord.js";
import moment from "moment";
import cron from "cron";
import { AllServers } from "../functions/http-functions/servers.js";
import { GetAllBirthdays } from "../functions/http-functions/birthdays.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export default async (client) => {
    try {
        const guilds = [...client.guilds.cache];
        let model;
        await AllServers()
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status == 'success' && guilds.length) {
            model.resultItems.map(async (item) => {
                if (client.guilds.cache.get(item.serverid)) {
                    if (item.birthdays && item.generalchannelid == client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                        let birthdays;
                        await GetAllBirthdays({ serverid: item.serverid })
                            .then(res => birthdays = res.data.model)
                            .catch(err => birthdays = err.response.data.model);

                        if (birthdays.status == 'success') {
                            birthdays.resultItems.map(async (item2) => {
                                let birthday = moment(new Date(item2.cron)).format('DD MM')
                                let split = birthday.split(" ")

                                let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                                    const embed = new MessageEmbed(EventEmbed)

                                    embed.setDescription('Birthday')
                                    embed.addField(`🎂 ${item2.fname.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${item2.discordid}> a happy Birthday!!!`)
                                    return client.channels.cache.get(item.generalchannelid).send({ embeds: [embed] });
                                });
                                event.start()
                            })
                        }
                    }
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
};