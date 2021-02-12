const {
    GET_SERVER,
    GET_SERVERS,
} = require("../endpoints")
const { HTTP } = require("../http")

const KEY = process.env.API_KEY

exports.GetServer = async (SERVER_ID) => {
    return HTTP({
        Method: "GET",
        Url: GET_SERVER(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.GetServers = async () => {
    return HTTP({
        Method: "GET",
        Url: GET_SERVERS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};