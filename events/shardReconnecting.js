const moment = require("moment")

module.exports = (client, id) => {
  console.log(`---SHARD RECONNECTING---\nNeoBot is reconnecting on ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}.\nThis can happen when NeoBot runs over an extended period.\n`);
};
