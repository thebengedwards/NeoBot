const Discord = require("discord.js");
const version = require("../package.json").version;
const img = "https://i.imgur.com/mvX0RY8.png"

const embed = new Discord.MessageEmbed()
	.setColor('0000FF')
	.setTitle('**Command**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version} [(i)](${'discordapp.com'} "NEO Version ${version}")`)
;

module.exports = (embed);