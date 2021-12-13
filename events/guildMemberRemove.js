import { MessageEmbed } from "discord.js";
import { GetServer } from "../functions/http-functions/servers.js";
import EventEmbed from "../components/embeds/eventEmbed.js";

export const run = async (client, member) => {
    try {
        let model;
        await GetServer({ serverid: member.guild.id })
            .then(res => model = res.data.model)
            .catch(err => model = err.response.data.model);

        if (model.status === 'success') {
            if (model.resultItems.serverid === member.guild.id && member.guild.channels.cache.find(item => item.id === model.resultItems.generalchannelid)) {
                const embed = new MessageEmbed(EventEmbed)

                embed.setDescription(`${member.user.username} has left the server`)
                embed.addFields(
                    { name: 'We shall miss them!', value: `${member.user.username} had been part of this server since ${moment(member.joinedTimestamp).format('Do MMMM YYYY')} at ${moment(member.joinedTimestamp).format('HH:mm')}` },
                    { name: `${member.guild.name} now has ${member.guild.memberCount} members`, value: `Bot: ${member.user.bot ? 'True' : 'False'}` },
                )
                return client.channels.cache.get(model.resultItems.generalchannelid).send({ embeds: [embed] });
            }
        }
    } catch (err) {
        console.log(err)
    }
};

export const details = {
    description: 'Member has left the guild',
    name: 'guildMemberRemove',
};