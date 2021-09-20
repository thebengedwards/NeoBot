const reqEvent = (event) => import(`../events/${event}`);
export const EventLoader = (client) => {
  console.log(client)
  // //Channel Events \\
  // client.on('channelCreate', (channel) => reqEvent('channelCreate')(client, channel));
  // client.on('channelDelete', (channel) => reqEvent('channelDelete')(client, channel));
  // client.on('channelPinsUpdate', (channel, time) => reqEvent('channelPinsUpdate')(client, channel, time));
  // client.on('channelUpdate', (oldChannel, newChannel) => reqEvent('channelUpdate')(client, oldChannel, newChannel));
  // // Emoji Events \\
  // client.on('emojiCreate', (emoji) => reqEvent('emojiCreate')(client, emoji));
  // client.on('emojiDelete', (emoji) => reqEvent('emojiDelete')(client, emoji));
  // client.on('emojiUpdate', (oldEmoji, newEmoji) => reqEvent('emojiUpdate')(client, oldEmoji, newEmoji));
  // // Guild Events \\
  // client.on('guildBanAdd', (guild, user) => reqEvent('guildBanAdd')(client, guild, user));
  // client.on('guildBanRemove', (guild, user) => reqEvent('guildBanRemove')(client, guild, user));
  // client.on('guildCreate', (guild) => reqEvent('guildCreate')(guild));
  // client.on('guildDelete', (guild) => reqEvent('guildDelete')(guild));
  // client.on('guildMemberAdd', (member) => reqEvent('guildMemberAdd')(client, member));
  // client.on('guildMemberRemove', (member) => reqEvent('guildMemberRemove')(client, member));
  // client.on('guildMemberUpdate', (oldMember, newMember) => reqEvent('guildMemberUpdate')(client, oldMember, newMember));
  // client.on('guildUnavailable', (guild) => reqEvent('guildUnavailable')(guild));
  // client.on('guildUpdate', (oldGuild, newGuild) => reqEvent('guildUpdate')(client, oldGuild, newGuild));
  // // Invite Events \\
  // client.on('inviteCreate', (invite) => reqEvent('inviteCreate')(client, invite));
  // client.on('inviteDelete', (invite) => reqEvent('inviteDelete')(client, invite));
  // // Message Events \\
  // client.on('messageCreate', (message) => reqEvent('messageCreate')(client, message));
  // client.on('messageDelete', (message) => reqEvent('messageDelete')(client, message));
  // client.on('messageDeleteBulk', (messages) => reqEvent('messageDeleteBulk')(client, messages));
  // client.on('messageReactionAdd', (messageReaction, user) => reqEvent('messageReactionAdd')(client, messageReaction, user));
  // client.on('messageReactionRemove', (messageReaction, user) => reqEvent('messageReactionRemove')(client, messageReaction, user));
  // //client.on('messageReactionRemoveAll', (message) => reqEvent('messageReactionRemoveAll')(client, message));
  // client.on('messageUpdate', (oldMessage, newMessage) => reqEvent('messageUpdate')(client, oldMessage, newMessage));
  // // Presence Events \\
  // //client.on('presenceUpdate', (oldMember, newMember) => reqEvent('presenceUpdate')(client, oldMember, newMember));
  // // Ready Events \\
  // client.on('ready', () => reqEvent('ready')(client));
  // // Role Events \\
  // client.on('roleCreate', (role) => reqEvent('roleCreate')(client, role));
  // client.on('roleDelete', (role) => reqEvent('roleDelete')(client, role));
  // client.on('roleUpdate', (oldRole, newRole) => reqEvent('roleUpdate')(client, oldRole, newRole));
  // // Shard Events \\
  // client.on('shardDisconnect', (event, id) => reqEvent('shardDisconnect')(client, event, id));
  // client.on('shardError', (error, shardID) => reqEvent('shardError')(client, error, shardID));
  // client.on('shardReconnecting', (id) => reqEvent('shardReconnecting')(client, id));
  // // Typing Events \\
  // //client.on('typingStart', (channel, user) => reqEvent('typingStart')(client, channel, user));
  // // Voice State Events \\
  // //client.on('voiceStateUpdate', (oldState, newState) => reqEvent('voiceStateUpdate')(client, oldState, newState));
  // // Webhook Events \\
  // client.on('webhookUpdate', (channel) => reqEvent('webhookUpdate')(client, channel));
  // // Websocket Events \\
  // client.ws.on('INTERACTION_CREATE', (interaction) => reqEvent('interactionCreate')(client, interaction));
};

export default EventLoader;