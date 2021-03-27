const Discord = require("discord.js");
const version = require("../package.json").version;
const cronBirthdays = require("../crons/birthdays");
const cronCalendars = require("../crons/calendars");
const cronPolls = require("../crons/polls");
const cronWeeklyMemes = require("../crons/weeklyMemes");
const { Reply } = require("../functions/helpers")

module.exports = async (client, interaction) => {
    getApp = (ID) => {
        const app = client.api.applications(client.user.id)
        if (ID) {
            app.guilds(ID)
        }
        return app
    }
    client.guilds.cache.map(async (item) => {
        const commands = await getApp(item.id).commands.get()
        client.commands.map(async (command) => { await getApp(item.id).commands.post({ data: command.help }) })
    })

    const { name, options } = interaction.data
    const perms = await client.elevation(interaction);
    const command = interaction.data.name.toLowerCase()
    cmd = client.commands.get(command);

    if (perms < cmd.conf.permLevel) {
        const alertEmbed = require('../embeds/alertEmbed')
        const embed = new Discord.MessageEmbed(alertEmbed)

        embed.setDescription('You do not have permission to use this command')
        Reply(client, interaction, embed)
    } else {
        cmd.run(client, interaction, options, perms);
    }
};
