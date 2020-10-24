//Neo's Guild Events are here
client.on('guildMemberAdd', member => {
    let guild = member.guild;
    client.channels.get(general).send(`Please welcome ${member.user.username} to ther server!`);
  });
  
  client.on('guildMemberRemove', member => {
    let guild = member.guild;
    client.channels.get(general).send(`${member.user.username} has left the server! We will miss you!`);
  });
  
  client.on('guildBanAdd',(guild, user) => {
    client.channels.get(general).send(`${user.username} was just banned`);
  });
  
  client.on('guildBanRemove',(guild, user) => {
    client.channels.get(general).send(`${user.username} was just unbanned!`);
  });