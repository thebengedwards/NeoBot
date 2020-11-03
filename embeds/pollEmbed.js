const Discord = require('discord.js');
const version = require('../package.json').version;
const embed = new Discord.MessageEmbed()
	.setTitle('Poll')
	.setColor('#6a0dad')
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);