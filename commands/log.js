exports.run = (client, message) => {
    message.channel.send('Version 1.0.0 \nBirthday reminders \nJokes \nMeme of the day \nGeneral Admin Tools \n————— \nVersion 1.0.1 \nFixed Late Birthday Bug \n————— \nVersion 1.0.2 \nRemoved \"Meme of the Day\" as it wasnt working as intended \n————— \nVersion 1.1.0 \nAdded Version Log \nRole assignemnt functionality \nVersion Status Implemented \nFixed Daily Meme so it no longer simply prints a url - it now sends an image as intended \nFixed jokes commands to be more efficient and have thousands of more jokes \nChanged NEO to listen for \"!\" instead of \"~\". \n————— \nVersion 1.1.1 \nMinor Bug fixes for Version 1.1.0 \n————— \nVersion 1.1.2 \nHost issue fixed \n————— \nVersion 1.1.3 \nAdded new dates to Neo\'s Calendar \nBackend stabilty fixes \n————— \nVersion 1.1.4 \nFixed Birthday Announcements \n—————');
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'log',
    description: 'Logs all the changes I have gone through',
    usage: 'log'
  };