const {
    GET_JOKE
} = require("../endpoints")
const { HTTPn } = require("../http")

exports.GetJoke = async () => {
    return HTTPn({
        Method: "GET",
        Url: GET_JOKE,
        Headers: {
            Accept: 'application/json',
        },
    })
};