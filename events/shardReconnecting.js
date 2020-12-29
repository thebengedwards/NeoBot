const moment = require("moment")

module.exports = client => {
  console.log(`NeoBot is reconnecting on ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}`);
};
