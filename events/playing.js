const version = require('../package.json').version;
module.exports = client => {
    client.on('ready', () => {client.user.setActivity('Version: '+version)});
};