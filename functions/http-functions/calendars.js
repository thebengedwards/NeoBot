const {
    CREATE_CALENDAR,
    GET_ALL_CALENDARS,
    VIEW_CALENDAR,
    DELETE_CALENDAR
} = require("../endpoints")
const { HTTP, HTTP_D } = require("../http")

const KEY = process.env.API_KEY

exports.CreateCalendar = async (DATA) => {
    return HTTP_D({
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
    return HTTP({
        Method: "GET",
        Url: GET_ALL_CALENDARS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.ViewCalendar = async (CALENDAR_ID) => {
    return HTTP({
        Method: "GET",
        Url: VIEW_CALENDAR(CALENDAR_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.DeleteCalendar = async (CALENDAR_ID) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_CALENDAR(CALENDAR_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};