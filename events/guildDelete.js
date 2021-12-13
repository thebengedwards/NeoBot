import { DeleteServer } from "../functions/http-functions/servers.js";

export const run = async (guild) => {
  try {
    await DeleteServer({ serverid: guild.id })
      .catch((err) => { console.log(err) });
  } catch (err) {
    console.log(err)
  }
};

export const details = {
  description: 'Guild has removed the bot',
  name: 'guildDelete',
};