const moment = require("moment")

module.exports = (client, event, id) => {
  try {
    console.log(`---SHARD DISCONNECT---\nNeoBot has been disconnected at ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}.\nThis can happen when the BOT-TOKEN has changed.\n`);
  } catch (err) {
    console.log(err)
  }
};