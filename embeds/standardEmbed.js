const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()   
	.setColor('#0099ff')
	.setTitle('')
	.setDescription('')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);