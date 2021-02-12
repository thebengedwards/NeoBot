const BASE_URL = process.env.API_URL;

exports.GET_SERVER = (SERVER_ID) => `${BASE_URL}/servers/${SERVER_ID}`;

exports.GET_SERVERS = `${BASE_URL}/servers`;

exports.GET_JOKE = `https://icanhazdadjoke.com/`;

// export const GET_SERVER = (SERVER_ID) => `${BASE_URL}/server/GetServer?id=${SERVER_ID}`;