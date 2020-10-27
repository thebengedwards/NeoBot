const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  // Startup events
  client.on('ready', () => reqEvent('ready')(client));
  client.on('ready', () => reqEvent('playing')(client));
  // After-redy events
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('disconnect', () => reqEvent('disconnect')(client));
  // Repeating events
  client.on('message', reqEvent('message'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildBanAdd', reqEvent('guildBanAdd'));
  client.on('guildBanRemove', reqEvent('guildBanRemove'));
  client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
};
