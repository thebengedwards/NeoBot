const version = require('../package.json').version;
module.exports = client => {
  console.log('I\'m Online, Running Version: '+version);
};
