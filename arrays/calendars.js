// This Array contains all important dates that neo needs for the cron event. Should be moved to a Database
const calendars = [
    // Calendar
    {
        // Christmas
        eventType: 'Calendar', // Event Type
        id: '🎅', // Disocrd ID
        fName: null, // First Name
        lName: 'Christmas', // Last Name
        cron: '00 00 08 25 11 *', // Date in: SS MM HH DD MM(-1) DoW
        gender: null, // for message
        serverID: 'Any' // Server this birthday is sent to
    },
    {
        // Halloween
        eventType: 'Calendar', // Event Type
        id: '🎃', // Disocrd ID
        fName: null, // First Name
        lName: 'Halloween', // Last Name
        cron: '00 00 08 31 09 *', // Date in: SS MM HH DD MM(-1) DoW
        gender: null, // for message
        serverID: 'Any' // Server this birthday is sent to
    },
    {
        // New Year
        eventType: 'Calendar', // Event Type
        id: '🎉', // Disocrd ID
        fName: null, // First Name
        lName: 'New Year', // Last Name
        cron: '00 01 00 01 00 *', // Date in: SS MM HH DD MM(-1) DoW
        gender: null, // for message
        serverID: 'Any' // Server this birthday is sent to
    },
]

// This exports the array
module.exports = calendars;