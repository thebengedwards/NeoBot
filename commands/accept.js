const settings = require('../settings.json');
exports.run = (client, message) => {
  const member_role = message.guild.roles.cache.find(name => name.name, settings.memberrolename);
    if(message.member.roles.find(r => r.name === "Member"))
    {
      message.member.send("You already have a role dummy!");
    } else
    {
      message.member.send("You have succesfully joined as a member!");
      message.member.addRole(member_role);
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'accept',
    description: 'Add the initial member role to your account!',
    usage: 'accept'
  };
  