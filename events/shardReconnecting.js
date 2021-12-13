import moment from "moment";

export default async (client, id) => {
  try {
    console.log(`---SHARD RECONNECTING---\nNeoBot is reconnecting on ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}.\nThis can happen when NeoBot runs over an extended period.\n`);
  } catch (err) {
    console.log(err)
  }
};
