import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import Settings from "./settings.js";
import { GetServer } from "./functions/http-functions/servers.js";
import EventLoader from './functions/eventLoader.js';

const client = new Client({ intents: new Intents(32767) });

client.commands = [];
fs.readdir("./commands", (err, files) => {
    files.map((file) => {
        import(`./commands/${file}`)
            .then((command) => {
                client.commands.push({ run: command.run, ...command.details });
            });
    });
});

client.events = [];
fs.readdir("./events", (err, files) => {
    files.map((file) => {
        import(`./events/${file}`)
            .then((event) => {
                client.events.push({ run: event.run, ...event.details });
            });
    });
});

EventLoader(client)

client.elevation = async (id) => {
    try {
        let model;
        await GetServer({ serverid: id })
            .then((res) => (model = res.data.model))
            .catch((err) => (model = err.response.data.model));

        if (model.status === "success") {
            let permlvl = 0;
            const guild = client.guilds.cache.find((item) => item.id === id).roles
                .cache;

            const member_role = guild.find((r) => r.name === "Member");
            if (member_role && guild.has(member_role.id)) permlvl = 1; // Member Level Access
            const mod_role = guild.find((r) => r.name === "Moderator");
            if (mod_role && guild.has(mod_role.id)) permlvl = 2; // Mod Level Access
            const admin_role = guild.find((r) => r.name === "Admin");
            if (admin_role && guild.has(admin_role.id)) permlvl = 3; // Admin Level Access
            if (model.resultItems.ownerid === id) permlvl = 4; // Server Owner Level Access
            if (Settings.reportid === id) permlvl = 5; // Dev Level Access
            return permlvl;
        }
    } catch (err) {
        console.log(err);
    }
};

client.login(process.env.BOT_TOKEN);
