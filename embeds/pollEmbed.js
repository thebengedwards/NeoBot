const Discord = require('discord.js');
const version = require('../package.json').version;
const img = require('../images/Poll.png')

const embed = new Discord.MessageEmbed()
	.setColor('#6a0dad')
	.setTitle('Poll')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);