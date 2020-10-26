const settings = require('../settings.json');
module.exports = client => {
    client.channels.get(settings.mod).send(`A message with the contents \"${msg.cleanContent}\" was deleted from ${msg.channel}`);
};
  