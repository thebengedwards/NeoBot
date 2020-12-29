const version = require("../package.json").version;
const cronBirthdays = require("../crons/birthdays")
const cronCalendars = require("../crons/calendars")
const cronPolls = require("../crons/polls")
const cronWeeklyMemes = require("../crons/weeklyMemes")

module.exports = client => {
  cronBirthdays()
  cronCalendars()
  cronPolls()
  cronWeeklyMemes()

  client.user.setActivity(`Version: ${version}`);

  console.log(`Bot Online, Running Version: ${version}`);
};
