import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/eoGhCom.png";

export default new MessageEmbed()
	.setColor('#808080')
	.setTitle('**Profanity**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${process.env.npm_package_version}`);