const endpoints = require("../endpoints")
const { HTTP } = require("../http")

exports.GetJoke = async () => {
    return HTTP({
        Method: "GET",
        Url: endpoints.GET_JOKE,
        Headers: {
            Accept: 'application/json',
        },
    })
};