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
  client.on('guildBanAdd', (guild, user) => reqEvent('guildBanAdd')(client, guild, user));
  client.on('guildBanRemove', (guild, user) => reqEvent('guildBanRemove')(client, guild, user));
  client.on('guildCreate', (guild) => reqEvent('guildCreate')(guild));
  client.on('guildDelete', (guild) => reqEvent('guildDelete')(guild));
  client.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(client, member));
  client.on('guildMemberRemove', (member) => reqEvent('guildMemberRemove')(client, member));
  client.on('guildMemberUpdate', (oldMember, newMember) => reqEvent('guildMemberUpdate')(client, oldMember, newMember));
  client.on('guildUnavailable', (guild) => reqEvent('guildUnavailable')(guild));
  client.on('guildUpdate', (oldGuild, newGuild) => reqEvent('guildUpdate')(client, oldGuild, newGuild));
  // Invite Events
  client.on('inviteCreate', (invite) => reqEvent('inviteCreate')(client, invite));
  client.on('inviteDelete', (invite) => reqEvent('inviteDelete')(client, invite));
  // Message Events
  client.on('message', (message) => reqEvent('message')(message));
  client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
  //client.on('messageDeleteBulk', () => reqEvent('')());
  //client.on('messageReactionAdd', () => reqEvent('')());
  //client.on('messageReactionRemove', () => reqEvent('')());
  //client.on('messageReactionRemoveAll', () => reqEvent('')());
  //client.on('messageUpdate', () => reqEvent('')());
  // Presence Events
  //client.on('presenceUpdate', () => reqEvent('')());
  // Ready Events
  client.on('ready', () => reqEvent('ready')(client));
  // Role Events
  //client.on('roleCreate', () => reqEvent('')());
  //client.on('roleDelete', () => reqEvent('')());
  //client.on('roleUpdate', () => reqEvent('')());
  // Shard Events
  client.on('shardDisconnect', () => reqEvent('shardDisconnect')(client));
  //client.on('shardError', () => reqEvent('')());
  client.on('shardReconnecting', () => reqEvent('shardReconnecting')(client));
  //client.on('shardResume', () => reqEvent('')());
  // Typing Events
  //client.on('typingStart', () => reqEvent('')());
  // User Events
  //client.on('userUpdate', () => reqEvent('')());
  // Voice State Events
  //client.on('voiceStateUpdate', () => reqEvent('')());
};
