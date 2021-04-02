const Discord = require("discord.js");
const { GetServer } = require("../functions/http-functions/servers");

module.exports = async (client, oldMember, newMember) => {
    try {
        let model;
        await GetServer({ serverid: newMember.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            let memberStatus;
            if (newMember.status === 'online') {
                memberStatus = '🟩 Online 🟩';
            } else if (newMember.status === 'idle') {
                memberStatus = '🟧 Idle 🟧';
            } else if (newMember.status === 'dnd') {
                memberStatus = '🟥 Do Not Disturb 🟥';
            } else {
                memberStatus = '⬜ Offline ⬜';
            }

            let customPresence;
            if (newMember.activities[0] === undefined) {
                customPresence = 'No custom status'
            } else {
                customPresence = newMember.activities[0].state
            }

            if (model.resultItems.serverid === oldMember.guild.id && newMember.guild.channels.cache.find(item => item.id === model.resultItems.modchannelid)) {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Presence Update')
                embed.addFields(
                    { name: `${newMember.user.username} is now:`, value: `${memberStatus}` },
                    { name: `Custom Status:`, value: `${customPresence}` },
                )
                return client.channels.cache.get(model.resultItems.modchannelid).send({ embed });
            }
        }
    } catch (err) {
        console.log(err)
    }
};
