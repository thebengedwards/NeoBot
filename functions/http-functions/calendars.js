const {
    CREATE_CALENDAR,
    GET_ALL_CALENDARS,
    VIEW_CALENDAR,
    DELETE_CALENDAR
} = require("../endpoints")
const { HTTP, HTTPn } = require("../http")

const KEY = process.env.API_KEY

exports.CreateCalendar = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.GetAllCalendars = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_CALENDARS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.ViewCalendar = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: VIEW_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteCalendar = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_CALENDAR,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};