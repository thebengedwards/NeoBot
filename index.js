// External dependencies
import Discord from 'discord.js'
const client = new Discord.Client();
// Internal dependencies
import Birthday from './auto/birthday.js'

// Run Birthday every day at 8am to check if there is a birthday.
let dateVariable = new Date(); // Sets up the date variable
let currentDate = dateVariable.getDate() + "/" + (dateVariable.getMonth()+1); // Sets todays date
let currentTime = dateVariable.getHours() + "/"  + dateVariable.getMinutes() + "/" + dateVariable.getSeconds();

if(currentTime === '08/00/00') {
   Birthday(currentDate)
}

//Token is secret
// client.login(process.env.BOT_TOKEN);