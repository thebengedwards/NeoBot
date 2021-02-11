import {
    GET_SERVER
} from '../endpoints'

export const GetServer = async (SERVER_ID) => {
    return HTTP({
        Method: "GET",
        Url: GET_SERVER(SERVER_ID),
        Headers: {
            'Content-Type': 'application/json',
            'API_KEY': KEY
        },
    })
};