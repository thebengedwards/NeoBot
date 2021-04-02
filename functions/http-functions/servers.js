const {
    CREATE_SERVER,
    ALL_SERVERS,
    GET_SERVER,
    UPDATE_SERVER,
    DELETE_SERVER
} = require("../endpoints")
const { HTTP, HTTPn } = require("../http")
const KEY = process.env.API_KEY

exports.CreateServer = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.AllServers = async () => {
    return HTTPn({
        Method: "GET",
        Url: ALL_SERVERS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.GetServer = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.UpdateServer = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteServer = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};