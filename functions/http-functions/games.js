const {
    CREATE_GAME,
    GET_ALL_GAMES,
    GET_GAME,
    UPDATE_GAME,
    DELETE_GAME
} = require("../endpoints")
const { HTTP, HTTPn } = require("../http")

const KEY = process.env.API_KEY

exports.CreateGame = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.GetAllGames = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_GAMES,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.GetGame = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.UpdateGame = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteGame = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};