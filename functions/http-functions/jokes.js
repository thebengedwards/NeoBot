import {
    GET_JOKE
} from "../endpoints.js";
import { HTTPn } from "../http.js";

export const GetJoke = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_JOKE,
        Headers: {
            Accept: 'application/json',
        },
    })
};