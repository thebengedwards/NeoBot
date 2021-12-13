import {
    CREATE_SERVER,
    ALL_SERVERS,
    GET_SERVER,
    UPDATE_SERVER,
    DELETE_SERVER
} from "../endpoints.js";
import { HTTP, HTTPn } from "../http.js";

export const CreateServer = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const AllServers = async () => {
    return HTTPn({
        Method: "GET",
        Url: ALL_SERVERS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
    })
};

export const GetServer = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const UpdateServer = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const DeleteServer = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_SERVER,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};