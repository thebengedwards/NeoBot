const version = require('../package.json').version;
exports.run = (client, message) => {
  message.reply(`YES I AM HERE \nSpeed: \`${Date.now() - message.createdTimestamp} ms\` \nNEO version: `+version+'. \nPowered by HEROKU');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'Test command. Check if I am online!',
  usage: 'test'
};
