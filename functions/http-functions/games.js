const {
    CREATE_GAME,
    GET_ALL_GAMES,
    VIEW_GAME,
    UPDATE_GAME,
    DELETE_GAME
} = require("../endpoints")
const { HTTP, HTTP_D } = require("../http")

const KEY = process.env.API_KEY

exports.CreateGame = async (DATA) => {
    return HTTP_D({
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
    return HTTP({
        Method: "GET",
        Url: GET_ALL_GAMES,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.ViewGame = async (GAME_ID) => {
    return HTTP({
        Method: "GET",
        Url: VIEW_GAME(CALENDAR_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.UpdateGame = async (SERVER_ID, DATA) => {
    return HTTP_D({
        Method: "PUT",
        Url: UPDATE_GAME(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteGame = async (GAME_ID) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_GAME(GAME_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};