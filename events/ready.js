const version = require("../package.json").version;
const cronBirthdays = require("../crons/birthdays")
const cronCalendars = require("../crons/calendars")
const cronPolls = require("../crons/polls")
const cronWeeklyMemes = require("../crons/weeklyMemes")

module.exports = client => {
  cronBirthdays(client)
  cronCalendars(client)
  cronPolls(client)
  cronWeeklyMemes(client)

  client.user.setActivity(`Version: ${version}`);

  console.log(`Bot Online, Running Version: ${version}`);
};
