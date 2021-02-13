const {
    CREATE_BIRTHDAY,
    GET_ALL_BIRTHDAYS,
    VIEW_BIRTHDAY,
    UPDATE_BIRTHDAY,
    DELETE_BIRTHDAY
} = require("../endpoints")
const { HTTP, HTTP_D } = require("../http")

const KEY = process.env.API_KEY

exports.CreateBirthday = async (DATA) => {
    return HTTP_D({
        Method: "POST",
        Url: CREATE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.GetAllBirthdays = async (SERVER_ID) => {
    return HTTP({
        Method: "GET",
        Url: GET_ALL_BIRTHDAYS(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.ViewBirthday = async (SERVER_ID, DATA) => {
    return HTTP_D({
        Method: "PUT",
        Url: VIEW_BIRTHDAY(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.UpdateBirthday = async (SERVER_ID, DATA) => {
    return HTTP_D({
        Method: "PUT",
        Url: UPDATE_BIRTHDAY(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteBirthday = async (SERVER_ID, DATA) => {
    return HTTP_D({
        Method: "DELETE",
        Url: DELETE_BIRTHDAY(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};