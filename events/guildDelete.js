const fetch = require("node-fetch")

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = guild => {

  fetch(`${PATH}/servers/${guild.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'API_KEY': KEY
    },
  })
    .then(res => res.json())
};
