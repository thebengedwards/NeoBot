import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/mvX0RY8.png";

export default new MessageEmbed()
  .setColor("0000FF")
  .setTitle("**Command**")
  .setThumbnail(img)
  .setTimestamp()
  .setFooter(`NeoBot Version: ${process.env.npm_package_version}`);
