const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()
	.setTitle('Alert')
	.setColor('#FF0000')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);