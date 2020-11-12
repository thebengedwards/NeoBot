const Discord = require('discord.js');
const version = require('../package.json').version;
const img = require('../images/Alert.png')

const embed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('Alert')
	.setThumbnail(img)
	.setTimestamp()
	.setFooter(`NEO Version: ${version}`)
;

module.exports = (embed);