exports.run = (client, message) => {
    let memberRole = message.member.guild.roles.find("name", "Member");
    if(message.member.roles.find(r => r.name === "Member"))
    {
      message.member.send("You already have a role dummy!");
    } else
    {
      message.member.send("You have succesfully joined as a member!");
      message.member.addRole(memberRole);
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
  