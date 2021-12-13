import { MessageEmbed } from "discord.js";
import { GetJoke } from "../functions/http-functions/jokes.js";
import Reply from "../functions/reply.js";
import AlertEmbed from "../components/embeds/alertEmbed.js";
import CommandEmbed from "../components/embeds/commandEmbed.js";

export const run = async (client, interaction) => {
  try {
    let joke;
    await GetJoke()
      .then(res => joke = res.data)
      .catch(err => joke = err.response.data);

    if (joke.status === 200) {
      const embed = new MessageEmbed(CommandEmbed)

      embed.setDescription('A Random Joke')
      embed.addField('Joke:', joke.joke)
      Reply(client, interaction, embed)
    } else {
      const embed = new MessageEmbed(AlertEmbed)

      embed.setDescription(`Joke API Error`)
      Reply(client, interaction, embed)
    }
  } catch (err) {
    console.log(err)
  }
};

export const details = {
  description: 'Makes NeoBot tell you a joke',
  enabled: true,
  name: 'joke',
  permLevel: 1
};