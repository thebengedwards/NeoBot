import {
    CREATE_BIRTHDAY,
    GET_ALL_BIRTHDAYS,
    GET_BIRTHDAY,
    UPDATE_BIRTHDAY,
    DELETE_BIRTHDAY
} from "../endpoints.js";
import { HTTP } from "../http.js";

export const CreateBirthday = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const GetAllBirthdays = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_ALL_BIRTHDAYS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const GetBirthday = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const UpdateBirthday = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const DeleteBirthday = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};