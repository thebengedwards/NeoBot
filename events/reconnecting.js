const moment = require('moment')

module.exports = client => {
  console.log(`Reconnecting at ${moment(new Date()).format('Do MMMM YYYY HH:mm')}. Last Restart: DATA HERE ago`);
};
