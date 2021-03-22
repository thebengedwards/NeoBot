const {
    CREATE_GAME,
    GET_ALL_GAMES,
    VIEW_GAME,
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

exports.ViewGame = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: VIEW_GAME,
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
        Url: UPDATE_GAME(SERVER_ID),
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