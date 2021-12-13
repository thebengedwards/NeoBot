export default async (client) => {
  // Channel Events \\
  client.on('channelCreate', (channel) => client.events.find(event => event.name == 'channelCreate').run(client, channel));
  client.on('channelDelete', (channel) => client.events.find(event => event.name == 'channelDelete').run(client, channel));
  client.on('channelDelete', (oldChannel, newChannel) => client.events.find(event => event.name == 'channelUpdate').run(client, oldChannel, newChannel));
  // Emoji Events \\
  client.on('emojiCreate', (emoji) => client.events.find(event => event.name == 'emojiCreate').run(client, emoji));
  client.on('emojiDelete', (emoji) => client.events.find(event => event.name == 'emojiDelete').run(client, emoji));
  client.on('emojiUpdate', (oldEmoji, newEmoji) => client.events.find(event => event.name == 'emojiUpdate').run(client, oldEmoji, newEmoji));
  // Guild Events \\
  client.on('guildBanAdd', (guild, user) => client.events.find(event => event.name == 'guildBanAdd').run(client, guild, user));
  client.on('guildBanRemove', (guild, user) => client.events.find(event => event.name == 'guildBanRemove').run(client, guild, user));
  client.on('guildBanAdd', (guild) => client.events.find(event => event.name == 'guildCreate').run(guild));
  client.on('guildBanAdd', (guild) => client.events.find(event => event.name == 'guildDelete').run(guild));
  client.on('guildMemberAdd', (member) => client.events.find(event => event.name == 'guildMemberAdd').run(client, member));
  client.on('guildMemberRemove', (member) => client.events.find(event => event.name == 'guildMemberRemove').run(client, member));
  client.on('guildMemberUpdate', (oldMember, newMember) => client.events.find(event => event.name == 'guildMemberUpdate').run(client, oldMember, newMember));
  client.on('guildUpdate', (oldGuild, newGuild) => client.events.find(event => event.name == 'guildUpdate').run(client, oldGuild, newGuild));
  // Invite Events \\
  client.on('inviteCreate', (invite) => client.events.find(event => event.name == 'inviteCreate').run(client, invite));
  client.on('inviteDelete', (invite) => client.events.find(event => event.name == 'inviteDelete').run(client, invite));
  // Message Events \\
  client.on('messageCreate', (message) => client.events.find(event => event.name == 'messageCreate').run(client, message));
  client.on('messageDelete', (message) => client.events.find(event => event.name == 'messageDelete').run(client, message));
  client.on('messageDeleteBulk', (messages) => client.events.find(event => event.name == 'messageDeleteBulk').run(client, messages));
  client.on('messageUpdate', (oldMessage, newMessage) => client.events.find(event => event.name == 'messageUpdate').run(client, oldMessage, newMessage));
  // Ready Events \\
  client.on('ready', (client) => client.events.find(event => event.name == 'ready').run(client));
  // Role Events \\
  client.on('roleCreate', (role) => client.events.find(event => event.name == 'roleCreate').run(client, role));
  client.on('roleDelete', (role) => client.events.find(event => event.name == 'roleDelete').run(client, role));
  client.on('roleUpdate', (role) => client.events.find(event => event.name == 'roleUpdate').run(client, oldRole, newRole));
  // Shard Events \\
  client.on('shardDisconnect', (event, id) => client.events.find(event => event.name == 'shardDisconnect').run(client, event, id));
  client.on('shardError', (event, shardId) => client.events.find(event => event.name == 'shardError').run(client, event, shardId));
  client.on('shardReconnecting', (id) => client.events.find(event => event.name == 'shardReconnecting').run(client, id));
  // Websocket Events \\
  client.ws.on('INTERACTION_CREATE', (interaction) => client.events.find(event => event.name == 'interactionCreate').run(client, interaction));
};