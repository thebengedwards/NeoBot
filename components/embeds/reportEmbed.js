import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/WqcSB5V.png";

export default new MessageEmbed()
	.setColor('#FF8300')
	.setTitle('**Report**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${process.env.npm_package_version}`);