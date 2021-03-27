const Discord = require("discord.js");
const version = require("../package.json").version;
const cronBirthdays = require("../crons/birthdays");
const cronCalendars = require("../crons/calendars");
const cronPolls = require("../crons/polls");
const cronWeeklyMemes = require("../crons/weeklyMemes");

module.exports = async (client) => {
  cronBirthdays(client)
  cronCalendars(client)
  cronPolls(client)
  cronWeeklyMemes(client)

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

  client.user.setActivity(`Version: ${version}`);

  console.log(`Bot Online, Running Version: ${version}`);
};
