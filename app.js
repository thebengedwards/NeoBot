// Critical .env setup
require("dotenv").config()
// Init NeoBot
const Discord = require("discord.js");
const client = new Discord.Client();
// Required for server setup
const settings = require("./settings.json")
// These are external libraries required to run additional Functions
const fs = require("fs");
// Http import
const { GetServer } = require("./functions/http-functions/servers")

require("./functions/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Processing...`)
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.elevation = async (interaction) => {
  try {
    let model;
    await GetServer({ serverid: interaction.guild_id })
      .then(res => model = res.data.model)
      .catch(err => model = err.response.data.model);

    if (model.status === 'success') {
      let permlvl = 0;
      guild = client.guilds.cache.find(item => item.id === interaction.guild_id).roles.cache
      try {
        const member_role = guild.find(r => r.name === "Member");
        if (member_role && guild.has(member_role.id)) permlvl = 1; // Member Level Access
        const mod_role = guild.find(r => r.name === "Moderator");
        if (mod_role && guild.has(mod_role.id)) permlvl = 2; // Mod Level Access
        const admin_role = guild.find(r => r.name === "Admin");
        if (admin_role && guild.has(admin_role.id)) permlvl = 3; // Admin Level Access
        if (model.resultItems.ownerid === interaction.member.user.id) permlvl = 4; // Server Owner Level Access
        if (settings.reportid === interaction.member.user.id) permlvl = 5; // Dev Level Access
        return permlvl;
      }
      catch (err) {
        console.log(`Error: ${err}`)
      }
    }
  } catch {
    console.log('Error connecting to API')
  }
};

client.login(process.env.BOT_TOKEN);