const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  // Channel Events
  client.on('channelCreate', (channel) => reqEvent('channelCreate')(client, channel));
  client.on('channelDelete', (channel) => reqEvent('channelDelete')(client, channel));
  client.on('channelPinsUpdate', (channel, time) => reqEvent('channelPinsUpdate')(client, channel, time));
  client.on('channelUpdate', (oldChannel, newChannel) => reqEvent('channelUpdate')(client, oldChannel, newChannel));
  // Emoji Events
  client.on('emojiCreate', (emoji) => reqEvent('emojiCreate')(client, emoji));
  client.on('emojiDelete', (emoji) => reqEvent('emojiDelete')(client, emoji));
  client.on('emojiUpdate', (oldEmoji, newEmoji) => reqEvent('emojiUpdate')(client, oldEmoji, newEmoji));
  // Guild Events
  client.on('guildCreate', (guild) => reqEvent('guildCreate')(guild));
  client.on('guildDelete', (guild) => reqEvent('guildDelete')(guild));
  // Invite Events
  
  // Message Events
  client.on('message', reqEvent('message'));
  client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
  // Ready Events
  client.on('ready', () => reqEvent('ready')(client));
  // Role Events

  // Shard Events
  client.on('shardDisconnect', () => reqEvent('shardDisconnect')(client));
  client.on('shardReconnecting', () => reqEvent('shardReconnecting')(client));
};
