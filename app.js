// Critical .env setup
require("dotenv").config()
// Init NEO
const Discord = require("discord.js");
const client = new Discord.Client();
// Required for server setup
const settings = require("./settings.json")
// These are external libraries required to run additional Functions
const fs = require("fs");
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

require("./util/eventLoader")(client);

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

client.elevation = async (message) => {
  let server = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  }).then(res => res.json());

  let permlvl = 0;
  try {
    const member_role = message.member.roles.cache.find(r => r.name === "Member");
    if (member_role && message.member.roles.cache.has(member_role.id)) permlvl = 1; // Member Level Access
    const mod_role = message.member.roles.cache.find(r => r.name === "Moderator");
    if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 2; // Mod Level Access
    const admin_role = message.member.roles.cache.find(r => r.name === "Admin");
    if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 3; // Admin Level Access
    if (server.ownerID === message.member.id) permlvl = 4; // Server Owner Level Access
    if (settings.reportid === message.member.id) permlvl = 5; // Dev Level Access
    return permlvl;
  }
  catch (err) {
    console.log(`Error: ${err}`)
  }
};

client.login(process.env.BOT_TOKEN);