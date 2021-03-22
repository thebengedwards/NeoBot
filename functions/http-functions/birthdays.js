const {
    CREATE_BIRTHDAY,
    GET_ALL_BIRTHDAYS,
    VIEW_BIRTHDAY,
    UPDATE_BIRTHDAY,
    DELETE_BIRTHDAY
} = require("../endpoints")
const { HTTP } = require("../http")

const KEY = process.env.API_KEY

exports.CreateBirthday = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.GetAllBirthdays = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_ALL_BIRTHDAYS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.ViewBirthday = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: VIEW_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.UpdateBirthday = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: UPDATE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteBirthday = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_BIRTHDAY,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};