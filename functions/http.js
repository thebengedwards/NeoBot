const axios = require("axios")

// HTTP Requests with DATA
exports.HTTP = async ({ Method, Url, Data = {}, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        data: Data,
        headers: Headers
    });
};

// HTTP Requests without DATA
exports.HTTPn = async ({ Method, Url, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        headers: Headers
    });
};