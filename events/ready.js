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
  
  // const commands = await getApp('271720862606950400').commands.get() // Get all commands in the guild
  // console.log(commands)
  // commands.map(async (command) => { await getApp('271720862606950400').commands(command.id).delete(), console.log(command.name) }) // Delete all the commands in the guild

  // const commands = await getApp().commands.get() // Get all commands in global
  // console.log(commands)
  // commands.map(async (command) => { await getApp().commands(command.id).delete(), console.log(command.name) }) // Delete all the commands in blobal

  client.commands.filter(item => item.conf.permLevel >= 5).map(async (command) => { await getApp('271720862606950400').commands.post({ data: command.help }) }) // Add commands to guild

  client.commands.filter(item => item.conf.permLevel < 5).map(async (command) => { await getApp().commands.post({ data: command.help }) }) // Add commands to global

  client.user.setActivity(`Version: ${version}`);

  console.log(`Bot Online, Running Version: ${version}`);
};
