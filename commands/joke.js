const Discord = require("discord.js")
const { GetServer } = require("../functions/http-functions/servers")
const { GetJoke } = require("../functions/http-functions/jokes")

exports.run = async (client, message) => {
  let server
  await GetServer(message.guild.id)
  .then(res => server = res.data)
  .catch((err) => {console.log('GetServer Error')});

  if (server.serverID === message.guild.id) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)
    
    let joke
    await GetJoke()
    .then(res => joke = res.data.joke)
    .catch((err) => {console.log('Joke Error')});

    embed.setDescription('A Random Joke')
    embed.addField('Here you go:', joke)
    return message.channel.send({ embed })

  } else {
    console.log('Error')
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 1
};

exports.help = {
  name: 'joke',
  description: 'Makes me tell you a joke',
  usage: 'joke'
};