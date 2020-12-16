const moment = require("moment")

module.exports = client => {
  console.log(`Reconnecting on ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}`);
};
