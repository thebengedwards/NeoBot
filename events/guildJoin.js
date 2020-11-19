const Discord = require('discord.js');
const fetch = require('node-fetch')

const PATH = process.env.API_URL
const KEY = process.env.API_KEY

module.exports = guild => {
  const body = { 
    serverName: guild.name,
    serverID: guild.id,
    ownerID: guild.ownerID,
    setupComplete: false,
  };

  fetch(`${PATH}/servers`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 
      'Content-Type': 'application/json',
      'API_KEY' : KEY
     },
  })
    .then(res => res.json())
};
