const { MessageEmbed } = require("discord.js");
const version = require("../../package.json").version;
const img = "https://i.imgur.com/mvX0RY8.png";

const embed = new MessageEmbed()
	.setColor('0000FF')
	.setTitle('**Command**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
	;

module.exports = (embed);