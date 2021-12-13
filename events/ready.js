import CronBirthdays from "../crons/birthdays.js";
import CronCalendars from "../crons/calendars.js";
import CronPolls from "../crons/polls.js";
import CronWeeklyMemes from "../crons/weeklyMemes.js";

export const run = async (client) => {
  try {
    CronBirthdays(client)
    CronCalendars(client)
    CronPolls(client)
    CronWeeklyMemes(client)

    const getApp = (ID) => {
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

    // client.commands.map(async (command) => { await getApp('883476976155918366').commands.post({ data: command }) }) // Add commands to guild
    // client.commands.filter(item => item.command.permLevel >= 5).map(async (command) => { await getApp('883476976155918366').commands.post({ data: command }) }) // Add commands to guild

    // client.commands.filter(item => item.command.permLevel < 5).map(async (command) => { await getApp().commands.post({ data: command }) }) // Add commands to global

    client.user.setActivity(`Version: ${process.env.npm_package_version}`);

    console.log(`Bot Online, Running Version: ${process.env.npm_package_version}`);
  } catch (err) {
    console.log(err)
  }
};

export const details = {
  description: 'The bot is ready',
  name: 'ready',
};