const moment = require('moment')

module.exports = client => {
  console.log(`Reconnecting at ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}`);
};
