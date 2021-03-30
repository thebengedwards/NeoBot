const Discord = require("discord.js");
const { GetJoke } = require("../functions/http-functions/jokes");
const { Reply } = require("../functions/helpers");

exports.run = async (client, interaction) => {
  try {
    let joke;
    await GetJoke()
      .then(res => joke = res.data)
      .catch(err => joke = err.response.data);

    if (joke.status === 200) {
      const commandEmbed = require('../embeds/commandEmbed')
      const embed = new Discord.MessageEmbed(commandEmbed)

      embed.setDescription('A Random Joke')
      embed.addField('Joke:', joke.joke)
      Reply(client, interaction, embed)
    } else {
      const alertEmbed = require('../embeds/alertEmbed')
      const embed = new Discord.MessageEmbed(alertEmbed)

      embed.setDescription(`Joke API Error`)
      Reply(client, interaction, embed)
    }
  } catch {
    const alertEmbed = require('../embeds/alertEmbed')
    const embed = new Discord.MessageEmbed(alertEmbed)

    embed.setDescription(`API Error`)
    Reply(client, interaction, embed)
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
  description: 'Makes NeoBot tell you a joke',
};