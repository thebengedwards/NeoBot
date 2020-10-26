const version = require('../package.json').version;
module.exports = client => {
  //client.user.setActivity('Version: '+version);
  console.log('I\'m Online, Running Version: '+version);
};
