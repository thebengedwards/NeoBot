import { MessageEmbed } from "discord.js";
const img = "https://i.imgur.com/zoS6UiX.png";

export default new MessageEmbed()
	.setColor('#FF0000')
	.setTitle('**Alert**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${process.env.npm_package_version}`);