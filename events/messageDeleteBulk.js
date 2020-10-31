const settings = require('../settings.json');
module.exports = (client, message) => {
    client.channels.cache.get(settings.mod).send(`A message with the contents \"${message.cleanContent}\" was deleted from ${message.channel}`);
    // client.on("messageDelete", (messageDelete) => {
    //     messageDelete.channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`)
    //    });
};