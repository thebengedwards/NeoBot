const Discord = require("discord.js");
const version = require("../package.json").version;
const img = "https://i.imgur.com/zoS6UiX.png"

const embed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('**Alert**')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NeoBot Version: ${version}`)
;

module.exports = (embed);