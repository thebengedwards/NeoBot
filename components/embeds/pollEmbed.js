const { MessageEmbed } = require("discord.js");
const version = require("../../package.json").version;
const img = "https://i.imgur.com/Qjc9cla.png";

const embed = new MessageEmbed()
	.setColor('#6a0dad')
	.setTitle('**Poll**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
	;

module.exports = (embed);