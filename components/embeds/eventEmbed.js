const { MessageEmbed } = require("discord.js");
const version = require("../../package.json").version;
const img = "https://i.imgur.com/t806T8w.png";

const embed = new MessageEmbed()
	.setColor('#00FF00')
	.setTitle('**Event**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
	;

module.exports = (embed);