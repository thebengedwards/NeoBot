const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
//These gather information from the settings file
const settings = require('./settings.json');
//These are external libraries required to run additional Functions
const randomPuppy = require('random-puppy');
const fs = require('fs');
const moment = require('moment');

require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    const props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 🟩`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      const cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  const member_role = message.guild.roles.cache.find(name => name.name, settings.memberrolename);
  if (member_role && message.member.roles.cache.has(member_role.id)) permlvl = 1;
  const mod_role = message.guild.roles.cache.find(name => name.name, settings.modrolename);
  if (mod_role && message.member.roles.cache.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.cache.find(name => name.name, settings.adminrolename);
  if (admin_role && message.member.roles.cache.has(admin_role.id)) permlvl = 3;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(e.replace(regToken, 'that was redacted'));
});

client.on('error', e => {
  console.log(e.replace(regToken, 'that was redacted'));
});

// //Neo's Client Events are here
// client.on('channelCreate', channel =>
// {
//   client.channels.get(admin).send(`A ${channel.type} channel by the name of ${channel.name} was created ${channel.createdAt} with the ID of ${channel.id}`);
//   if (channel.type === 'text') return channel.send(`This ${channel.type} channel was created ${channel.createdAt} and is called ${channel.name}.`);
// });

// client.on('channelDelete', channel => {
//   client.channels.get(admin).send(`A ${channel.type} channel by the name of ${channel.name} was successfully deleted.`);
//   client.channels.get(general).send(`Channel: ${channel.name} has been deleted`);
// });

// client.on('messageDelete', msg =>
// {
//   client.channels.get(admin).send(`A message with the contents \"${msg.cleanContent}\" was deleted from ${msg.channel}`);
// });

// //Neos Autonomous code goes here
// //Cron uses second, minute, hour, day(of the month, 1-31), Month(of the year, 0-11), and Sunday to Saturday(0-6)
// // let WeeklyFunnyMeme = new cron.CronJob('00 00 20 * * 5', () =>
// // {
// //   let subreddit = "dankmemes";
// //   client.channels.get(memes).send("This week's Funny Meme:");
// //   randomPuppy(subreddit).then(async url => {
// //     await client.channels.get(memes).send({
// //       files:
// //       [{
// //         attachment: url,
// //         name: 'meme.png'
// //       }]
// //     })
// //   }).catch(err => console.error(err));
// // });
// // WeeklyFunnyMeme.start()

// // //Neos Calendar Dates go here
// // let NewYear = new cron.CronJob('00 01 00 01 00 *', () =>
// // {
// //   client.channels.get(general).send("🎉 HAPPY NEW YEAR EVERYONE 🎉");
// // });
// // NewYear.start()
// // let Halloween = new cron.CronJob('00 00 08 31 09 *', () =>
// // {
// //   client.channels.get(general).send("🎃 HAPPY HALLOWEEN EVERYONE 🎃");
// // });
// // Halloween.start()
// // let Christmas = new cron.CronJob('00 00 08 25 11 *', () =>
// // {
// //   client.channels.get(general).send("🎅 MERRY CHRISTMAS EVERYONE 🎅");
// // });
// // Christmas.start()


// // //Birthdays of Members
// // let BenEBday = new cron.CronJob('00 00 08 14 01 *', () =>
// // {
// //   client.channels.get(general).send("<@271719405384105986>, BEN ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // BenEBday.start()
// // let JamieSBday = new cron.CronJob('00 00 08 10 05 *', () =>
// // {
// //   client.channels.get(general).send("<@271744164377526274>, JAMIE ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // JamieSBday.start()
// // let AlexBBday = new cron.CronJob('00 00 08 03 04 *', () =>
// // {
// //   client.channels.get(general).send("<@271758756595892236>, ALEX ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // AlexBBday.start()
// // let EdBBday = new cron.CronJob('00 00 08 12 06 *', () =>
// // {
// //   client.channels.get(general).send("<@272104323729588225>, ED ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // EdBBday.start()
// // let MaxDBday = new cron.CronJob('00 00 08 23 08 *', () =>
// // {
// //   client.channels.get(general).send("<@385480935900184579>, MAX ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // MaxDBday.start()
// // let OllieMBday = new cron.CronJob('00 00 08 16 03 *', () =>
// // {
// //   client.channels.get(general).send("<@283292935552761857>, OLLIE ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // OllieMBday.start()
// // let AlexHBday = new cron.CronJob('00 00 08 01 03 *', () =>
// // {
// //   client.channels.get(general).send("<@348126167062151180>, ALEX ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // AlexHBday.start()
// // let DylanCBday = new cron.CronJob('00 00 08 09 06 *', () =>
// // {
// //   client.channels.get(general).send("<@272090190657486848>, DYLAN ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // DylanCBday.start()
// // let GenMBday = new cron.CronJob('00 00 08 07 01 *', () =>
// // {
// //   client.channels.get(general).send("<@393047942526926850>, GEN ITS YOUR BIRTHDAY\nCan we all please wish her a happy Birthday!!!");
// // });
// // GenMBday.start()
// // let MilanJBday = new cron.CronJob('00 00 08 07 10 *', () =>
// // {
// //   client.channels.get(general).send("<@277488461844578304>, MILAN ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // MilanJBday.start()
// // let AlexTBday = new cron.CronJob('00 00 08 05 06 *', () =>
// // {
// //   client.channels.get(general).send("<@215951713717190656>, ALEX ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // AlexTBday.start()
// // let FinEBday = new cron.CronJob('00 00 08 28 05 *', () =>
// // {
// //   client.channels.get(general).send("<@286255321264029697>, FIN ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // FinEBday.start()
// // let SamFBday = new cron.CronJob('00 00 08 26 05 *', () =>
// // {
// //   client.channels.get(general).send("<@377971556959256577>, SAM ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!");
// // });
// // SamFBday.start()