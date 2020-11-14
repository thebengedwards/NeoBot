const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  // Startup events
  client.on('ready', () => reqEvent('playing')(client));
  client.on('ready', () => reqEvent('ready')(client));
  client.on('ready', () => reqEvent('cron')(client));
  client.on('ready', () => reqEvent('gamePoll')(client));
  // After-ready events
  client.on('disconnect', () => reqEvent('disconnect')(client));
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('guildCreate', (guild) => reqEvent('guildJoin')(guild));
  // Repeating events
  client.on('message', reqEvent('message'));
  client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
};
