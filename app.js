// Init NEO
const Discord = require('discord.js');
const client = new Discord.Client();
// Required for server setup
const servers = require('./arrays/servers')
// These are external libraries required to run additional Functions
const fs = require('fs');

require('./util/eventLoader')(client);

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

client.elevation = message => {
  let permlvl = 0;
  try {
    const member_role = message.member.roles.cache.find(r => r.name === "Member");
    if (member_role && message.member.roles.cache.has(member_role.id)) permlvl = 1;
    const mod_role = message.member.roles.cache.find(r => r.name === "Moderator");
    if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 2;
    const admin_role = message.member.roles.cache.find(r => r.name === "Admin");
    if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 3;
    if (servers.find(item => item.ownerID === message.member.id)) permlvl = 4;
    console.log(permlvl)
    return permlvl;
  } 
  catch(err) {
    console.log(`Error: ${err}`)
  }
};

//client.login(process.env.BOT_TOKEN);
client.login('NTg3OTA5MjUyODg3MjE2MTI4.XP9bKA.vNespg5NsPmI-8OvCkatppK9-E4');