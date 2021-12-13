import { MessageEmbed } from "discord.js";
import moment from "moment";
import cron from "cron";
import { AllServers } from "../functions/http-functions/servers.js";
import { GetAllCalendars } from "../functions/http-functions/calendars.js";
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
                    if (item.calendar && item.generalchannelid == client.guilds.cache.get(item.serverid).channels.cache.get(item.generalchannelid).id) {
                        let calendars;
                        await GetAllCalendars()
                            .then(res => calendars = res.data.model)
                            .catch(err => calendars = err.response.data.model);

                        if (calendars.status == 'success') {
                            calendars.resultItems.map((item2) => {
                                let calendar = moment(new Date(item2.cron)).format('DD MM')
                                let split = calendar.split(" ")

                                let event = new cron.CronJob(`00 00 08 ${split[0]} ${split[1] - 1} *`, () => {
                                    const embed = new MessageEmbed(EventEmbed)

                                    embed.setDescription('Calendar')
                                    embed.addField(`📅 HAPPY ${item2.name.toUpperCase()} EVERYONE! 📅`, `@everyone, have a great ${item2.name}.`)
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