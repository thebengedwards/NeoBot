const Discord = require('discord.js');
const version = require('../package.json').version;
const img = new Discord.MessageAttachment('../images/Command.png');

const embed = new Discord.MessageEmbed()
	.setColor('0000FF')
	.setTitle('Command')
	.setThumbnail('attachment://Command.png')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);