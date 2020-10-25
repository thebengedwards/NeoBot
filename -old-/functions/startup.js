//When Neo is started up, this text is returned to the terminal
client.on('ready',() =>
{
  console.log('I\'m Online, Running Version: '+version);
});

client.on('disconnect', () =>
{
  console.log(`You have been disconnected at ${new Date()}`);
});

client.on('reconnecting', () =>
{
  console.log(`Reconnecting at ${new Date()}`);
});

client.on('ready', () => {client.user.setActivity('Version: '+version)});