// This Array contains all the servers that neo is on. Should be moved to a Database
const servers = [
    {
        // HMS Underachievement
        serverName: 'HMS Underachievement', // Server Name
        serverID: '271720862606950400', // Disocrd ID
        ownerID: '271719405384105986', // Owner ID
        
        setupComplete: true, // Has the bot completed setup

        adminRoleID: '606388933076713493', // Server Admin ID
        modRoleID: '607186951073955844', // Server Moderator ID
        memberRoleID: '606388890701529098', // Server Member ID
                
        welcomeChannelID: '308218528941473792', // Channel ID for Welcome
        modChannelID: '770317791727190016', // Channel ID for Moderators
        generalChannelID: '555037465862340611', // Channel ID for General
        memesChannelID:'555037708150505476', // Channel ID for Memes
        gameUpdatesChannelID:'653706378812063776', // Channel ID for Game Updates
        updateLogChannelID: '475329009694015489', // Channel ID for Update Log

        weeklyMeme: true, // Have weekly memes been enabled?
        birthdays: true, // Have birthdays been enabled
        calendar: true, // Have calendars been enabled?
        polls: true, // Have poll events been enabled
    },
    {
        // The Server
        serverName: 'The Server', // Server Name
        serverID: '777212409248612393', // Disocrd ID
        ownerID: '271719405384105986', // Owner ID
        
        setupComplete: true, // Has the bot completed setup

        adminRoleID: '0', // Server Admin ID
        modRoleID: '0', // Server Moderator ID
        memberRoleID: '0', // Server Member ID
                
        welcomeChannelID: '0', // Channel ID for Welcome
        modChannelID: '0', // Channel ID for Moderators
        generalChannelID: '0', // Channel ID for General
        memesChannelID:'0', // Channel ID for Memes
        gameUpdatesChannelID:'0', // Channel ID for Game Updates
        updateLogChannelID: '0', // Channel ID for Update Log

        weeklyMeme: false, // Have weekly memes been enabled?
        birthdays: false, // Have birthdays been enabled
        calendar: false, // Have calendars been enabled?
        polls: false, // Have poll events been enabled
    }
]

// This exports the array
module.exports = servers;