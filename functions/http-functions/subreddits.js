import {
    CREATE_SUBREDDIT,
    GET_ALL_SUBREDDITS,
    GET_SUBREDDIT,
    DELETE_SUBREDDIT
} from "../endpoints.js";
import { HTTP, HTTPn } from "../http.js";

export const CreateSubreddit = async (DATA) => {
    return HTTP({
        Method: "POST",
        Url: CREATE_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const GetAllSubreddits = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_ALL_SUBREDDITS,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
    })
};

export const GetSubreddit = async (DATA) => {
    return HTTP({
        Method: "PUT",
        Url: GET_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};

export const DeleteSubreddit = async (DATA) => {
    return HTTP({
        Method: "DELETE",
        Url: DELETE_SUBREDDIT,
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': process.env.API_KEY
        },
        Data: DATA
    })
};