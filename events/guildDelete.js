const { DeleteServer } = require("../functions/http-functions/servers");

module.exports = async (guild) => {
  await DeleteServer({ serverid: guild.id })
    .catch((err) => { console.log(err) });
};
