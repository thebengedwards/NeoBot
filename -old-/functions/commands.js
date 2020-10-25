//Neo uses ! to know if it is being told a command
client.on('message', message =>
{
  let args = message.content.split(' ').slice(1);
  var result = args.join(' ');

  if (!message.content.startsWith(prefix)) return;
  console.log('Message Recieved');
  if(message.author.bot) return;

  if (message.content === prefix + 'accept')
  {
    let memberRole = message.member.guild.roles.find("name", "Member");
    if(message.member.roles.find(r => r.name === "Member"))
    {
      message.member.send("You already have a role dummy!");
    } else
    {
      message.member.send("You have succesfully joined as a member!");
      message.member.addRole(memberRole);
    }
  } else

  if (message.content === prefix + 'test')
  {
    message.reply(`YES I AM HERE \nSpeed: \`${Date.now() - message.createdTimestamp} ms\` \nNEO version: `+version+'. \nPowered by HEROKU');
  } else

  if (message.content === prefix + 'help')
  {
    message.channel.send('Hello, I\'m NEO, the assistant BOT for this discord server. \nI am used for mainly admin tools, but i do also have some availible user commands. \nTo use commands, use \"!\", as i can only hear commands that start with it. \nList of Availible commands: \nhelp - contains instructions and a list of all availible commands \ntest - tests the users connection to NEO and tells them which version they are running \njoke - makes NEO tell a random joke \nlog - NEO tells you about his previous Verions \nPlease Enjoy the bot!');
  } else

  if (message.content === prefix + 'joke')
  {
    giveMeAJoke.getRandomDadJoke(function(joke)
    {
      message.reply(joke);
    });
  } else

  if (message.content === prefix + 'log')
  {
    message.channel.send('Version 1.0.0 \nBirthday reminders \nJokes \nMeme of the day \nGeneral Admin Tools \n————— \nVersion 1.0.1 \nFixed Late Birthday Bug \n————— \nVersion 1.0.2 \nRemoved \"Meme of the Day\" as it wasnt working as intended \n————— \nVersion 1.1.0 \nAdded Version Log \nRole assignemnt functionality \nVersion Status Implemented \nFixed Daily Meme so it no longer simply prints a url - it now sends an image as intended \nFixed jokes commands to be more efficient and have thousands of more jokes \nChanged NEO to listen for \"!\" instead of \"~\". \n————— \nVersion 1.1.1 \nMinor Bug fixes for Version 1.1.0 \n————— \nVersion 1.1.2 \nHost issue fixed \n————— \nVersion 1.1.3 \nAdded new dates to Neo\'s Calendar \nBackend stabilty fixes \n————— \nVersion 1.1.4 \nFixed Birthday Announcements \n—————');
  } else

  if (message.content === prefix + 'test')
  {
    message.channel.send();
  }

});