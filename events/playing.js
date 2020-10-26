const version = require('../package.json').version;
module.exports = client => {
    client.user.setActivity('Version: '+version);
};