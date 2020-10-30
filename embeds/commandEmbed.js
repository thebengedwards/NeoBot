const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()   
	.setTitle('Command')
	.setColor('0000FF')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);