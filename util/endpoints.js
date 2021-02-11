const BASE_URL = process.env.API_URL;

export const GET_SERVER = (SERVER_ID) => `${BASE_URL}/Server/GetServer?id=${SERVER_ID}`;