const Discord = require('discord.js');
const version = require('../package.json').version;
const img = require('../images/Poll.png')

const embed = new Discord.MessageEmbed()
	.setColor('#FF8300')	
	.setTitle('Report')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);