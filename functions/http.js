const axios = require("axios")

// HTTP Requests without DATA
exports.HTTP = async ({ Method, Url, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        headers: Headers
    });
};

// HTTP Requests with DATA
exports.HTTP_D = async ({ Method, Url, Data = {}, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        data: Data,
        headers: Headers
    });
};