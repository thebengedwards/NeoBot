<<<<<<< HEAD
module.exports = client => {
  console.log('I\'m Online');
=======
const version = require('../package.json').version;
module.exports = client => {
  console.log('I\'m Online, Running Version: '+version);
>>>>>>> 9fac21f5ac8188b730b208139c669ef5ddd7708c
};
