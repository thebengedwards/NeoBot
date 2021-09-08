const { MessageEmbed } = require("discord.js");
const { GetJoke } = require("../functions/http-functions/jokes");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const commandEmbed = require('../components/embeds/commandEmbed');

exports.run = async (client, interaction) => {
  try {
    let joke;
    await GetJoke()
      .then(res => joke = res.data)
      .catch(err => joke = err.response.data);

    if (joke.status === 200) {
      const embed = new MessageEmbed(commandEmbed)

      embed.setDescription('A Random Joke')
      embed.addField('Joke:', joke.joke)
      Reply(client, interaction, embed)
    } else {
      const embed = new MessageEmbed(alertEmbed)

      embed.setDescription(`Joke API Error`)
      Reply(client, interaction, embed)
    }
  } catch (err) {
    console.log(err)
  }
};

exports.command = {
  description: 'Makes NeoBot tell you a joke',
  enabled: true,
  name: 'joke',
  permLevel: 1
};