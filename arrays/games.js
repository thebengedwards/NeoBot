// This Array contains all the games that neo needs for the cron event. Should be moved to a Database
const games = [
    {
        gameName: 'Among Us', // The Name of the game
        gameType: 'Multiplayer', // The Type of the game
        gameDesc: 'Hunting down murderers on a spaceship while they try to kill you', // The Description of the game
        gameRating: '10/10', // The Rating of the game
        playWith: '3-9', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Apex Legends', // The Name of the game
        gameType: 'Battle Royale', // The Type of the game
        gameDesc: 'Battle to see who is the ultimate legend', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-2', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Counter Strike: Global Offensive', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'Rush B', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-4', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Destiny 2', // The Name of the game
        gameType: 'Adventure/Shooter', // The Type of the game
        gameDesc: 'Play as a Guardian and save the light from the darkness', // The Description of the game
        gameRating: '8/10', // The Rating of the game
        playWith: '1-2', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Fall Guys: Ultimate Knockout', // The Name of the game
        gameType: 'Fun', // The Type of the game
        gameDesc: 'NOOT NOOT... Beans?', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-2', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Garry\'s Mod', // The Name of the game
        gameType: 'Fun', // The Type of the game
        gameDesc: 'Ima firing ma layzer', // The Description of the game
        gameRating: '10/10', // The Rating of the game
        playWith: '1-63', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Grand Theft Auto V', // The Name of the game
        gameType: 'Crime/Violence', // The Type of the game
        gameDesc: 'Welcome to Los Santos', // The Description of the game
        gameRating: '10/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'PLAYERUNKNOWN\'S BATTLEGROUNDS', // The Name of the game
        gameType: 'Battle Royale', // The Type of the game
        gameDesc: 'Where is my pan?!?', // The Description of the game
        gameRating: '8/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Rocket League', // The Name of the game
        gameType: 'Football', // The Type of the game
        gameDesc: 'WHat a save!', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-2', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Civilization V', // The Name of the game
        gameType: 'Turn Based Strategy', // The Type of the game
        gameDesc: 'Nuclear Ghandi is enabled', // The Description of the game
        gameRating: '10/10', // The Rating of the game
        playWith: '1-6', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Team Fortress 2', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'SENTRY DOWN!', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-9', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Star Trek Online', // The Name of the game
        gameType: 'MMORPG', // The Type of the game
        gameDesc: 'ENGAGE!', // The Description of the game
        gameRating: '6/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Star Wars Battlefront (Classic)', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'Another Happy Landing', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-9', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Star Wars Battlefront II (Classic)', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'This is where the fun begins', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-9', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'STAR WARS Battlefront', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'Dammit EA', // The Description of the game
        gameRating: '8/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'STAR WARS Battlefront II', // The Name of the game
        gameType: 'Shooter', // The Type of the game
        gameDesc: 'I was bad but now i\'m good', // The Description of the game
        gameRating: '9/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'STAR WARS The Old Republic', // The Name of the game
        gameType: 'MMORPG', // The Type of the game
        gameDesc: 'Like The Manalorian just 4000 years in the past', // The Description of the game
        gameRating: '8/10', // The Rating of the game
        playWith: '1-3', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    },
    {
        gameName: 'Any Game', // The Name of the game
        gameType: 'Any', // The Type of the game
        gameDesc: 'Honestly just anything if you are bored', // The Description of the game
        gameRating: 'Any', // The Rating of the game
        playWith: 'Any', // How many others can you play the game with
        serverID: '271720862606950400' // The server ID this game alert belongs to
    }
]

// This exports the array
module.exports = games;