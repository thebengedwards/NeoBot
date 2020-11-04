const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()
	.setTitle('Report')
	.setColor('#FF8300')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);