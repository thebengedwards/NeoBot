const BASE_URL = process.env.API_URL;

exports.CREATE_BIRTHDAY = `${BASE_URL}/birthdays`;

exports.GET_ALL_BIRTHDAYS = (SERVER_ID) => `${BASE_URL}/birthdays/${SERVER_ID}`;

exports.VIEW_BIRTHDAY = (SERVER_ID) => `${BASE_URL}/birthdays/${SERVER_ID}`;

exports.UPDATE_BIRTHDAY = (SERVER_ID) => `${BASE_URL}/birthdays/${SERVER_ID}`;

exports.DELETE_BIRTHDAY = (SERVER_ID) => `${BASE_URL}/birthdays/${SERVER_ID}`;

exports.CREATE_CALENDAR = `${BASE_URL}/calendars`;

exports.GET_ALL_CALENDARS = `${BASE_URL}/calendars`;

exports.VIEW_CALENDAR = (CALENDAR_ID) => `${BASE_URL}/calendars/${CALENDAR_ID}`;

exports.DELETE_CALENDAR = (CALENDAR_ID) => `${BASE_URL}/calendars/${CALENDAR_ID}`;

exports.GET_SERVER = (SERVER_ID) => `${BASE_URL}/servers/${SERVER_ID}`;

exports.GET_SERVERS = `${BASE_URL}/servers`;

exports.UPDATE_SERVER = (SERVER_ID) => `${BASE_URL}/servers/${SERVER_ID}`;

exports.GET_JOKE = `https://icanhazdadjoke.com/`;