const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  // Startup events
  client.on('ready', () => reqEvent('playing')(client));
  client.on('ready', () => reqEvent('ready')(client));
  // After-ready events
  client.on('disconnect', () => reqEvent('disconnect')(client));
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('guildCreate', (guild) => reqEvent('guildJoin')(guild));
  // Cron Events
  client.on('ready', () => reqEvent('cronBirthday')(client));
  client.on('ready', () => reqEvent('cronCalendar')(client));
  client.on('ready', () => reqEvent('cronWeeklyMeme')(client));
  client.on('ready', () => reqEvent('gamePoll')(client));
  // Repeating events
  client.on('message', reqEvent('message'));
  client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
};
