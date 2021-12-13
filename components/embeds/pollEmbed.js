import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/Qjc9cla.png";

export default new MessageEmbed()
	.setColor('#6a0dad')
	.setTitle('**Poll**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${process.env.npm_package_version}`);