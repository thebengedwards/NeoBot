const giveMeAJoke = require('give-me-a-joke');
exports.run = (client, message) => {
    giveMeAJoke.getRandomDadJoke(function(joke)
    {
      message.reply(joke);
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'joke',
    description: 'Makes me tell you a joke',
    usage: 'joke'
  };