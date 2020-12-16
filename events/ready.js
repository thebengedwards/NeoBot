const version = require("../package.json").version;

module.exports = client => {
  console.log(`Bot Online, Running Version: ${version}`);
};
