const Discord = require('discord.js');
const client = new Discord.Client();
const version = require('./package.json').version;
//These gather information from the settings file
const settings = require('./settings.json');
//These are external libraries required to run additional Functions
const giveMeAJoke = require('give-me-a-joke');
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
    log(`Loading Command: ${props.help.name}. 👌`);
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
  const mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
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

// //Neo uses ! to know if it is being told a command
// client.on('message', message =>
// {
//   let args = message.content.split(' ').slice(1);
//   var result = args.join(' ');

//   if (!message.content.startsWith(prefix)) return;
//   console.log('Message Recieved');
//   if(message.author.bot) return;

//   if (message.content === prefix + 'accept')
//   {
//     let memberRole = message.member.guild.roles.find("name", "Member");
//     if(message.member.roles.find(r => r.name === "Member"))
//     {
//       message.member.send("You already have a role dummy!");
//     } else
//     {
//       message.member.send("You have succesfully joined as a member!");
//       message.member.addRole(memberRole);
//     }
//   } else

//   if (message.content === prefix + 'test')
//   {
//     message.reply(`YES I AM HERE \nSpeed: \`${Date.now() - message.createdTimestamp} ms\` \nNEO version: `+version+'. \nPowered by HEROKU');
//   } else

//   if (message.content === prefix + 'help')
//   {
//     message.channel.send('Hello, I\'m NEO, the assistant BOT for this discord server. \nI am used for mainly admin tools, but i do also have some availible user commands. \nTo use commands, use \"!\", as i can only hear commands that start with it. \nList of Availible commands: \nhelp - contains instructions and a list of all availible commands \ntest - tests the users connection to NEO and tells them which version they are running \njoke - makes NEO tell a random joke \nlog - NEO tells you about his previous Verions \nPlease Enjoy the bot!');
//   } else

//   if (message.content === prefix + 'joke')
//   {
//     giveMeAJoke.getRandomDadJoke(function(joke)
//     {
//       message.reply(joke);
//     });
//   } else

//   if (message.content === prefix + 'log')
//   {
//     message.channel.send('Version 1.0.0 \nBirthday reminders \nJokes \nMeme of the day \nGeneral Admin Tools \n————— \nVersion 1.0.1 \nFixed Late Birthday Bug \n————— \nVersion 1.0.2 \nRemoved \"Meme of the Day\" as it wasnt working as intended \n————— \nVersion 1.1.0 \nAdded Version Log \nRole assignemnt functionality \nVersion Status Implemented \nFixed Daily Meme so it no longer simply prints a url - it now sends an image as intended \nFixed jokes commands to be more efficient and have thousands of more jokes \nChanged NEO to listen for \"!\" instead of \"~\". \n————— \nVersion 1.1.1 \nMinor Bug fixes for Version 1.1.0 \n————— \nVersion 1.1.2 \nHost issue fixed \n————— \nVersion 1.1.3 \nAdded new dates to Neo\'s Calendar \nBackend stabilty fixes \n————— \nVersion 1.1.4 \nFixed Birthday Announcements \n—————');
//   } else

//   if (message.content === prefix + 'test')
//   {
//     message.channel.send();
//   }

// });

//Token is secret
client.login(process.env.BOT_TOKEN);