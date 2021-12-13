import moment from "moment";

export default async (client, error, shardID) => {
    try {
        console.log(`---SHARD ERROR---\nNeoBot encountered an Error at ${moment(new Date()).format('Do MMMM YYYY')} at ${moment(new Date()).format('HH:mm:ss')}.\nThis can happen when a Websocket error occurs.\n`);
    } catch (err) {
        console.log(err)
    }
};