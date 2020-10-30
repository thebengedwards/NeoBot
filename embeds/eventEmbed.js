const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()
	.setTitle('Event')  
	.setColor('#00FF00')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);