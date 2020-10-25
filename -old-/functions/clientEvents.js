//Neo's Client Events are here
client.on('channelCreate', channel =>
{
  client.channels.get(admin).send(`A ${channel.type} channel by the name of ${channel.name} was created ${channel.createdAt} with the ID of ${channel.id}`);
  if (channel.type === 'text') return channel.send(`This ${channel.type} channel was created ${channel.createdAt} and is called ${channel.name}.`);
});

client.on('channelDelete', channel => {
  client.channels.get(admin).send(`A ${channel.type} channel by the name of ${channel.name} was successfully deleted.`);
  client.channels.get(general).send(`Channel: ${channel.name} has been deleted`);
});

client.on('messageDelete', msg =>
{
  client.channels.get(admin).send(`A message with the contents \"${msg.cleanContent}\" was deleted from ${msg.channel}`);
});