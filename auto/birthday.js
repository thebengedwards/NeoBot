import Discord from 'discord.js'
import { Birthdays } from '../data/birthdayData.js' // Imports the birthday array
const client = new Discord.Client();

function Birthday(currentDate) {
  let birthdayAlert = Birthdays.find(user => user.date === currentDate);
  
  if (birthdayAlert) {
    //client.channels.get(general).send(`<@${birthdayAlert.id}>, ${birthdayAlert.fName.toUpperCase} ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!`);
    console.log(`<@${birthdayAlert.id}>, ${birthdayAlert.fName.toUpperCase()} ITS YOUR BIRTHDAY🎂!\nCan we all please wish ${birthdayAlert.gender.toLowerCase()} a happy Birthday!!!`)
  }
}

export default Birthday;

// let dateVariable = new Date(); // Sets up the date variable
// let currentDate = dateVariable.getDate() + "/" + (dateVariable.getMonth()+1) // Sets todays date

// let birthdayAlert = Birthdays.find(user => user.date === currentDate) // Checks if anyone has their birthday today


// if(birthdayAlert) {
//   client.channels.get(general).send(`<@${birthdayAlert.id}>, ${birthdayAlert.fName.toUpperCase} ITS YOUR BIRTHDAY\nCan we all please wish him a happy Birthday!!!`);
//   console.log(`<@${birthdayAlert.id}>, ${birthdayAlert.fName.toUpperCase()} ITS YOUR BIRTHDAY🎂!\nCan we all please wish ${birthdayAlert.gender.toLowerCase()} a happy Birthday!!!`)
// }