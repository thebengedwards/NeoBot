const axios = require("axios")

export const HTTP = ({ Method, Url, Data = {}, Headers = {} }) => {
    return axios({
        method: Method,
        url: Url,
        data: Data,
        headers: Headers
    });
};