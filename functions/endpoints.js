const BASE_URL = process.env.API_URL;

exports.CREATE_BIRTHDAY = `${BASE_URL}/Birthday/createBirthday`;

exports.GET_ALL_BIRTHDAYS = `${BASE_URL}/Birthday/allBirthdays`;

exports.GET_BIRTHDAY = `${BASE_URL}/Birthday/getBirthday`;

exports.UPDATE_BIRTHDAY = `${BASE_URL}/Birthday/updateBirthday`;

exports.DELETE_BIRTHDAY = `${BASE_URL}/Birthday/deleteBirthday`;

exports.CREATE_CALENDAR = `${BASE_URL}/Calendar/createCalendar`;

exports.GET_ALL_CALENDARS = `${BASE_URL}/Calendar/allCalendars`;

exports.GET_CALENDAR = `${BASE_URL}/Calendar/getCalendar`;

exports.DELETE_CALENDAR = `${BASE_URL}/Calendar/deleteCalendar`;

exports.CREATE_GAME = `${BASE_URL}/Game/createGame`;

exports.GET_ALL_GAMES = `${BASE_URL}/Game/allGames`;

exports.GET_GAME = `${BASE_URL}/Game/getGame`;

exports.UPDATE_GAME = `${BASE_URL}/Game/updateGame`;

exports.DELETE_GAME = `${BASE_URL}/Game/deleteGame`;

exports.CREATE_SERVER = `${BASE_URL}/Server/createServer`;

exports.ALL_SERVERS = `${BASE_URL}/Server/allServers`;

exports.GET_SERVER = `${BASE_URL}/Server/getServer`;

exports.UPDATE_SERVER = `${BASE_URL}/Server/updateServer`;

exports.DELETE_SERVER = `${BASE_URL}/Server/deleteServer`;

exports.CREATE_SUBREDDIT = `${BASE_URL}/Subreddit/createSubreddit`;

exports.GET_ALL_SUBREDDITS = `${BASE_URL}/Subreddit/allSubreddits`;

exports.GET_SUBREDDIT = `${BASE_URL}/Subreddit/getSubreddit`;

exports.DELETE_SUBREDDIT = `${BASE_URL}/Subreddit/deleteSUbreddit`;

exports.GET_JOKE = `https://icanhazdadjoke.com/`;