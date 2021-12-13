import { MessageEmbed } from "discord.js";
import moment from "moment";
import Settings from "../settings.js";
import Reply from "../functions/reply.js";
import commandEmbed from "../components/embeds/commandEmbed.js";

export const run = async (client, interaction) => {
  try {
    let user = interaction.member.user;
    let guild = client.guilds.cache.find(
      (item) => item.id === interaction.member.guild.id
    );

    const embed = new MessageEmbed(commandEmbed);

    embed.setDescription("Test");
    embed.addFields(
      {
        name: `Hello ${user.username}`,
        value: `🟩 NeoBot is currently Online 🟩`,
      },
      { name: "\u200B", value: `---CURRENT SERVER---` },
      { name: "Name:", value: `${guild.name}`, inline: true },
      { name: "Members:", value: `${guild.memberCount}`, inline: true },
      { name: "Region:", value: `${guild.region}`, inline: true },
      { name: "\u200B", value: `---ABOUT NEOBOT---` },
      {
        name: "Active Servers",
        value: `${client.guilds.cache.size}`,
        inline: true,
      },
      {
        name: "Available Commands:",
        value: `${client.commands.size}`,
        inline: true,
      },
      { name: "Verified:", value: `${client.user.verified}`, inline: true },
      { name: "\u200B", value: `---DATA---` },
      {
        name: "Joined date:",
        value: `${moment(guild.joinedTimestamp).format("Do MMMM YYYY")}`,
        inline: true,
      },
      { name: "Powered by:", value: `${Settings.host}`, inline: true }
    );
    Reply(client, interaction, embed);
  } catch (err) {
    console.log(err);
  }
};

export const details = {
  description: "Test command. Check if I am online!",
  enabled: true,
  name: "test",
  permLevel: 0,
};
