const Discord = require("discord.js");
const version = require("../package.json").version;
const img = "https://i.imgur.com/Qjc9cla.png"

const embed = new Discord.MessageEmbed()
	.setColor('#6a0dad')
	.setTitle('**Poll**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version} [(i)](${message.url} "NEO Version ${version}")`)
;

module.exports = (embed);