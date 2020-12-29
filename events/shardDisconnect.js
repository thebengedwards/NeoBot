const moment = require("moment")

module.exports = client => {
  console.log(`NeoBot has been disconnected at ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}. This Happens when the Bot Token is changed`);
};