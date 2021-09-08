const { MessageEmbed } = require("discord.js");
const version = require("../../package.json").version;
const img = "https://i.imgur.com/WqcSB5V.png";

const embed = new MessageEmbed()
	.setColor('#FF8300')
	.setTitle('**Report**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
	;

module.exports = (embed);