import {
    CREATE_CALENDAR,
    GET_ALL_CALENDARS,
    GET_CALENDAR,
    DELETE_CALENDAR
} from "../endpoints.js";
import { HTTP, HTTPn } from "../http.js";

export const CreateCalendar = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const GetAllCalendars = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_CALENDARS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
    })
};

export const GetCalendar = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const DeleteCalendar = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};