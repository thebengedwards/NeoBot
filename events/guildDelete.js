const { DeleteServer } = require("../functions/http-functions/servers");

module.exports = async (guild) => {
  try {
    await DeleteServer({ serverid: guild.id })
      .catch((err) => { console.log(err) });
  } catch (err) {
    console.log(err)
  }
};
