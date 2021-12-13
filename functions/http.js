import axios from "axios";

// HTTP Requests with DATA
export const HTTP = async ({ Method, Url, Data = {}, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        data: Data,
        headers: Headers
    });
};

// HTTP Requests without DATA
export const HTTPn = async ({ Method, Url, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        headers: Headers
    });
};