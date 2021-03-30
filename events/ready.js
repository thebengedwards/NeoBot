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
  // commands.map(async (command) => { await getApp('271720862606950400').commands(command.id).delete() }) // Delete all the commands in the guild

  client.commands.map(async (command) => { await getApp('271720862606950400').commands.post({ data: command.help }) }) // Add all commands to guild

  // client.commands.filter(item => item.conf.permLevel < 5).map(async (command) => { await getApp('271720862606950400').commands.post({ data: command.help }) }) // Add all commands to global

  client.user.setActivity(`Version: ${version}`);

  console.log(`Bot Online, Running Version: ${version}`);
};
