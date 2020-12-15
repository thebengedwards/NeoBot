const Discord = require("discord.js")
const giveMeAJoke = require("give-me-a-joke")
const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

exports.run = async (client, message) => {
  let data = await fetch(`${PATH}/servers/${message.guild.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    }
  })
    .then(res => res.json());

  if (data.serverID === message.guild.id) {
    const commandEmbed = require('../embeds/commandEmbed')
    const embed = new Discord.MessageEmbed(commandEmbed)

    giveMeAJoke.getRandomDadJoke(function (joke) {
      embed.setDescription('A Random Joke')
      embed.addField('Here you go:', joke)
      return message.channel.send({ embed })
    });
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