import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/t806T8w.png";

export default new MessageEmbed()
	.setColor('#00FF00')
	.setTitle('**Event**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${process.env.npm_package_version}`);