const Discord = require('discord.js');
const version = require('../package.json').version;
const img = 'https://i.imgur.com/WqcSB5V.png'

const embed = new Discord.MessageEmbed()
	.setColor('#FF8300')	
	.setTitle('Report')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);