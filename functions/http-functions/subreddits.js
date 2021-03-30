const {
    CREATE_SUBREDDIT,
    GET_ALL_SUBREDDITS,
    GET_SUBREDDIT,
    DELETE_SUBREDDIT
} = require("../endpoints")
const { HTTP, HTTPn } = require("../http")

const KEY = process.env.API_KEY

exports.CreateSubreddit = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.GetAllSubreddits = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_SUBREDDITS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};

exports.GetSubreddit = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};

exports.DeleteSubreddit = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
        Data: DATA
    })
};