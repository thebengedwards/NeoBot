import {
    CREATE_GAME,
    GET_ALL_GAMES,
    GET_GAME,
    UPDATE_GAME,
    DELETE_GAME
} from "../endpoints.js";
import { HTTP, HTTPn } from "../http.js";

export const CreateGame = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const GetAllGames = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_GAMES,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
    })
};

export const GetGame = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const UpdateGame = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const DeleteGame = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_GAME,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};