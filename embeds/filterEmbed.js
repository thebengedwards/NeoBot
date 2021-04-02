const Discord = require("discord.js");
const version = require("../package.json").version;
const img = "https://i.imgur.com/eoGhCom.png";

const embed = new Discord.MessageEmbed()
	.setColor('#808080')
	.setTitle('**Profanity**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
;

module.exports = (embed);