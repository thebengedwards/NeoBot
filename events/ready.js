const version = require("../package.json").version;
const cronBirthdays = require("../crons/birthdays");
const cronCalendars = require("../crons/calendars");
const cronPolls = require("../crons/polls");
const cronWeeklyMemes = require("../crons/weeklyMemes");

module.exports = async (client) => {
  try {
    cronBirthdays(client)
    // cronCalendars(client)
    // cronPolls(client)
    // cronWeeklyMemes(client)

    getApp = (ID) => {
      const app = client.api.applications(client.user.id)
      if (ID) {
        app.guilds(ID)
      }
      return app
    }

    // const commands = await getApp('883476976155918366').commands.get() // Get all commands in the guild
    // console.log(commands)
    // commands.map(async (command) => { await getApp('883476976155918366').commands(command.id).delete(), console.log(command.name) }) // Delete all the commands in the guild

    // const commands = await getApp().commands.get() // Get all commands in global
    // console.log(commands)
    // commands.map(async (command) => { await getApp().commands(command.id).delete(), console.log(command.name) }) // Delete all the commands in global

    client.commands.map(async (command) => { await getApp('883476976155918366').commands.post({ data: command.command }) }) // Add commands to guild
    // client.commands.filter(item => item.command.permLevel >= 5).map(async (command) => { await getApp('883476976155918366').commands.post({ data: command.command }) }) // Add commands to guild

    // client.commands.filter(item => item.command.permLevel < 5).map(async (command) => { await getApp().commands.post({ data: command.command }) }) // Add commands to global

    client.user.setActivity(`Version: ${version}`);

    console.log(`Bot Online, Running Version: ${version}`);
  } catch (err) {
    console.log(err)
  }
};
