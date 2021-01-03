[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/theBenEdwards/NeoBot">
    <img src="images/Logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">NeoBot</h3>

  <p align="center">
    A response and task Bot for Discord Servers!
    <br />
    <a href="https://github.com/theBenEdwards/NeoBot"><strong>Explore the code »</strong></a>
    <br />
    <br />
    <a href="https://github.com/theBenEdwards/NeoBot/issues">Report a Bug</a>
    ·
    <a href="https://github.com/TheBenEdwards/NeoBot/pulls">View Pull Requests</a>
    ·
    <a href="https://github.com/TheBenEdwards/NeoBot/network/dependencies">Dependencies</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
        <li><a href="#executing">Executing</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#permission-levels">Permission Levels</a></li>
        <li>
          <a href="#configuring">Configuring</a>
          <ul>
            <li><a href="#identifications">Identifications</a></li>
            <li><a href="#channels">Channels</a></li>
            <li><a href="#functions">Functions</a></li>
          </ul>
        </li>
        <li>
          <a href="#general-usage">General Usage</a>
          <ul>
            <li><a href="#commands">Commands</a></li>
            <li><a href="#events">Events</a></li>
          </ul>
        </li>
        <li><a href="#error-reporting">Error Reporting</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#the-team">The Team</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#invite">Invite</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Hello, and welcome to the NeoBot Discord.js project. This project has been going since 2018 when Ben, the lead developer, thought about creating his own discord bot for his discord server. Discord bots have been around for as long as we can remember, and creating our own was a fun little project. The project since then has grown into something much larger, with a whole backend API being added in version 2.0.0 to hold and process data for later use!

When the bot was in early development, there were few public repos that the author could reference on how to use certain functions, and JavaScript was a newly learnt langauge of the developer, and therefore found already exisitng bots on GitHub very useful.

Thererfore if any new Discord.js developers are looking for some easy-to-read code to follow just like we did, this repository is available for cloning in order to assist and strengthen your coding ability.

We want to do this because:
* Your time should be focused on creating something amazing, not getting stuck on issues like we did!
* Everyone struggles at first, but when we see how other people succeeded we can learn from it.
* We are grateful to the entire Discord.js community for giving us so much, and want to give a little bit back!
* Encouraging new people into Discord.js is always something good! We enjoyed it, and so can you!

Of course, there are and will always be issues with this project. Bugs and errors happen all the time, but over time more and more will be fixed. If you run into an issue, other developers have likely already found a solution to the problem! Or, if you would like to report the issue directly to us, please create a bug report by following the link above!

This is the list of dependencies and tools we used to create this project:

### Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [nodejs](https://nodejs.org/)
* [cron](https://www.npmjs.com/package/cron)
* [discord.js](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [give-me-a-joke](https://www.npmjs.com/package/give-me-a-joke)
* [imageapi.js](https://www.npmjs.com/package/imageapi.js)
* [moment](https://www.npmjs.com/package/moment)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [Heroku](https://devcenter.heroku.com/)

<!-- GETTING STARTED -->
## Getting Started

To just 'check out' the project and see how we got the code to work, clone the repo. This will create a completely detached directory for you to do whatever you want to the code. 

* Clone the repo
```sh
git clone https://github.com/theBenEdwards/NeoBot.git
```

To create a feature, see <a href="#contributing">Contributing</a> instructions below!

### Prerequisites

Find all the advised software and packages in <a href="#built-with">Built With</a>

At the very start, you will need a code editor such as Visual Studio Code, Atom or notepad++. We advise using Visual Studio Code, but any will suffice.

For local deployment and testing, you will also want nodejs installed.

Once you have the repository saved on your machine, open a Command Line Interface and use:

* npm
```sh
npm install
```

This will install all the necessary packages from npm.

### Environment Variables

Environment Variables are used by developers to securely store sensitive data such as BOT_TOKEN and API_KEY. These must not be released to the public and therefore must be hidden.

In order to create a version of NeoBot, you will have to substitute these variables with your own.

<details>
  <summary>BOT_TOKEN</summary>

  The BOT_TOKEN is what nodejs uses to connect your bot to discord. To create a bot token:

  1. Create a new bot application at the [Discord Developer Portal](https://discord.com/developers/applications)
  2. Go to 'Bot' option
  3. Add a new Bot to the app
  4. Click on _'Click to Reveal Token'_
  5. Copy the very long token, and paste in the .env file with BOT_TOKEN

  * Define like this:
  ```sh
  BOT_TOKEN=[BOT_TOKEN_HERE]
  ```

  This is a required step.
</details>

<details>
  <summary>API_KEY</summary>

  API_KEY is the password your API uses in the header to make sure the sender is a permitted user. 

  If you do not have an API, either create arrays to subsitute for the api calls, import them and use them instead, or simply remove the API files entirely.

  * Define like this:
  ```sh
  API_KEY=[PASSWORD HERE]
  ```

  This is an optional step.
</details>

<details>
  <summary>API_URL</summary>

  API_URL is the link to the API itself. 

  Similarily to API_KEY, either create arrays to subsitute for the api calls, import them and use them instead, or simply remove the API files entirely.

  * Define like this:
  ```sh
  API_URL=[https://api-url-here/]
  ```

  This is an optional step.
</details>

### Executing

Once all the dependencies are ready and the .env file or the arrays are set up, we can get the bot running.

* Double check npm packages are installed
```sh
npm install
```

* Then, compile and run the bot locally
```sh
node app.js
```

<!-- USAGE EXAMPLES -->
## Usage

This section is primarily meant for server owners and admins, as it covers the basics, setup and usages of the bot on a discord server.

When being added to a server through the portal, you must make sure the bot is added with the `Administrator` permissions, as if NeoBot does not have the necessary permissions, Discord will throw a DiscordApiError, which will not allow the bot to function properly. Please make sure you add permissions correctly.

### Permission Levels

NeoBot has 6 main permission levels:

<details>
  <summary>@everyone - people who do not have a role</summary>

  ```sh
  permlvl: 0
  ```
</details>

<details>
  <summary>@members - members have basic access to low-tier commands</summary>

  ```sh
  permlvl: 1
  ```
</details>

<details>
  <summary>@moderators - moderators have more advanced server commands</summary>

  ```sh
  permlvl: 2
  ```
</details>

<details>
  <summary>@admins - admins have access to almost all commands</summary>

  ```sh
  permlvl: 3
  ```
</details>

<details>
  <summary>@owners - owners have access to all commands</summary>

  ```sh
  permlvl: 4
  ```
</details>

<details>
  <summary>@developers - developers have access to all commands</summary>

  ```sh
  permlvl: 5
  ```
</details>

If you have feedback on which roles should have or should not have access to certain commands, please send in feedback.

### Configuring

In order to configure and activate NeoBot, when first joining the server NeoBot will ask for a `!config` command to be sent. This sets up the server on the database and allows further data to be assigned to datapoints on the database.

#### Identifications

NeoBot uses 3 main roles to communicate to - member, moderator and admin. If you do not have these roles do not worry, simply assign the already exisiting roles in your server to the roles that should have these permissions.
To set these roles or change them, follow these instructions:

1. Turn on discord dev mode (in user settings)
2. Right click on the role in role menu of the server and select `Copy ID`
3. Type `!setAdminID`/`!setModID`/`!setMemberID` followed by the role ID you have copied
4. The result should look something like this:
```
!setAdminID 1234567890
```
5. If this does not work, try setting it again.
6. For changing the ID follow steps 1-5 again.

#### Channels

NeoBot uses 6 main channels to communicate to - welcome, mod, general, memes, game and update channels. These are used by various functions and need to be logged for a function to work correctly. Not all channels need to be used, but if you dont set them you might not see some functionality work.
To set these channels or to change them, follow these instructions:

1. Turn on discord dev mode (in user settings)
2. Right click on the channel select `Copy ID`
3. Type `!setWelcomeChannel`/`!setModChannel`/`!setGeneralChannel`/`!setMemesChannel`/`!setGameChannel`/`!setUpdateChannel` followed by the channel ID you have copied
4. The result should look something like this:
```
!setWelcomeChannel 1234567890
```
5. If this does not work, try setting it again.
6. For changing the ID follow steps 1-5 again.

#### Functions

NeoBot uses 4 main functions - birthdays, calendar, polls and weeklyMemes. These are mostly automated and rely on other data within the database, however as server Admins/Owners you can enable or disable these functions
To enable/disable these functions, follow these instructions:

1. Type `!toggleBirthdays`/`!toggleCalendar`/`!togglePolls`/`!toggleWeeklyMemes`
2. This should enable/disable the setting you wish to toggle.
4. The result should look something like this:
```
!toggleBirthdays
```
5. If this does not work, try step 1 again.

Birthdays, calendars, polls and weelyMemes all operate the [cron](https://www.npmjs.com/package/cron) package, which allows for these to be scripted to appear ar certain times. When the NeoBot is started, the onReady() event runs the cron events, which loads all the scripted events. This means that if a new event is added, it will not be added to the cron list until the bot has been redeployed. Heroku fixes this, as every 24 hours it restarts all dynos, resulting in the app being redpolyed.
Therefore, for safety, all events should be added at least 2 days before the event day actually occurs, as the cron package will then recieve the new event.

### General Usage

In General use, NeoBot has two types of functions - command based scripts that will process when the user gives an input, and event based scripts that will process once an event is triggered. Here are a list of all these scripts broken down, and what they can do.

#### Commands

NeoBot has many commands. This list will break down what types of users can use what commands, judging by which role a user has. Commands are usable by users with the respective level, and users with a higher permission level can also access the command.

<details>
  <summary>Everyone</summary>

  * When first joining a server, a user can be displayed with a T&C's and can use !accept to assign themselves the role of 'Member'.
  ```
  !accept
  ```

  * A quick test to see if NeoBot is active.
  ```
  !test
  ```
</details>

<details>
  <summary>Member</summary>

  * Show all the commands below permission level 3 with some helpful tips.
  ```
  !help
  ```

  * Show an automated joke.
  ```
  !joke
  ```

  * Show all the updates and changes NeoBot has gone through.
  ```
  !log
  ```
</details>

<details>
  <summary>Moderator</summary>

  * Shows more help for channel setups.
  ```
  !helpChannels
  ```

  * Shows more help for Event setups.
  ```
  !helpEvents
  ```

  * Shows more help for Role setups.
  ```
  !helpRoles
  ```

  * Sends a message to the developers with any feedback. Usable in dm's.
  ```
  !report
  ```
</details>

<details>
  <summary>Administrator</summary>

  Administrators have many commands, and is broken down into several sections, as they make use of many server commands.
  <blockquote>
  <details>
  <summary>General</summary>
    
  * Delete a certain amount of messages.
  ```
  !purge
  ```
    
  * Configure your server, see the status of your settings.
  ```
  !config
  ```
  </details>

  <details>
  <summary>Birthday</summary>
    
  * Add a birthday to your server.
  ```
  !birthdayAdd
  ```

  * Show all birthdays on your server.
  ```
  !birthdayAll
  ```

  * Delete a birthday from your server.
  ```
  !birthdayDelete
  ```

  * Update a birthday on your server.
  ```
  !birthdayUpdate
  ```

  * View a single birthday on your server.
  ```
  !birthdayView
  ```
  </details>

  <details>
  <summary>Roles</summary>

  * Set the Admin ID for your server.
  ```
  !setAdminID
  ```

  * Set the Moderator ID for your server.
  ```
  !setModID
  ```

  * Set the Member ID for your server.
  ```
  !setMemberID
  ```
  </details>

  <details>
  <summary>Channels</summary>

  * Set the General Channel for your server.
  ```
  !setGeneralChannel
  ```

  * Set the Moderator Channel for your server.
  ```
  !setModChannel
  ```

  * Set the Memes Channel for your server.
  ```
  !setMemesChannel
  ```

  * Set the Game Channel for your server.
  ```
  !setGameChannel
  ```

  * Set the Update Channel for your server.
  ```
  !setUpdateChannel
  ```
  </details>

  <details>
  <summary>Functions</summary>

  * Toggle Birthday alerts.
  ```
  !toggleBirthdays
  ```

  * Toggle Calendar alerts.
  ```
  !toggleCalendar
  ```

  * Toggle Game Polls.
  ```
  !togglePolls
  ```

  * Toggle Weekly Memes.
  ```
  !toggleWeeklyMemes
  ```
  </details>

  </blockquote>

</details>

<details>
  <summary>Owner</summary>

  Owners have access to all previous levels, and should be treated as admin-level users. This permission level is needed for early server-bot setup and configuration.
</details>

<details>
  <summary>Developer</summary>

  Developers have access to specific commands used by functions that are active accross all servers. This means that these need to be locked down more tightly than the other functions. If a user would like to add to these functions, please use either !report on Discord or try adding an issue above.

  Developers have many commands, and is broken down into several sections, as they make use of many NeoBot commands.
  <blockquote>
  <details>
  <summary>Calendar</summary>

  * Add a calendar to the database.
  ```
  !calendarAdd
  ```

  * See all calendars on the database.
  ```
  !calendarAll
  ```

  * Delete a calendar from the database.
  ```
  !calendarDelete
  ```

  * View a calendar on the database.
  ```
  !calendarView
  ```
  </details>

  <details>
  <summary>Game</summary>

  * Add a game to the database.
  ```
  !gameAdd
  ```

  * See all games on the database.
  ```
  !gameAll
  ```

  * Delete a game from the database.
  ```
  !gameDelete
  ```

  * Update a game on the database.
  ```
  !gameUpdate
  ```

  * View a game on the database.
  ```
  !gameView
  ```
  </details>

  <details>
  <summary>Subreddit</summary>

  * Add a subreddit to the database.
  ```
  !subredditAdd
  ```

  * See all subreddits on the database.
  ```
  !subredditAll
  ```

  * Delete a subreddit from the database.
  ```
  !subredditDelete
  ```

  * View a subreddit on the database.
  ```
  !subredditView
  ```
  </details>

  </blockquote>

</details>

#### Events

NeoBot has many Events. This list will break down what types of events there are, what they do and which ones are active or not. Events can be triggered by anyone, and are automatic.

<details>
  <summary>Channel Events</summary>

  Channel Events are related to server channels.
  <blockquote>
  <details>
  <summary>channelCreate</summary>

  NeoBot sends a message to the Mod Channel whenever a new chanel is created, containing various channel details.
  </details>

  <details>
  <summary>channelDelete</summary>

  NeoBot sends a message to the Mod Channel whenever a channel is deleted, containing various channel details.
  </details>

  <details>
  <summary>channelPinsUpdate</summary>

  NeoBot sends a message to the Mod Channel whenever a channel pin is updated, containing various channel details.
  </details>

  <details>
  <summary>channelUpdate</summary>

  NeoBot sends a message to the Mod Channel whenever a channel is updated, containing various channel details.
  </details>

  </blockquote>

</details>

<details>
  <summary>Emoji Events</summary>

  Emoji Events are related to server emojis.
  <blockquote>
  <details>
  <summary>emojiCreate</summary>

  NeoBot sends a message to the Mod Channel whenever an emoji is created, containing various emoji details.
  </details>

  <details>
  <summary>emojiDelete</summary>

  NeoBot sends a message to the Mod Channel whenever an emoji is deleted, containing various emoji details.
  </details>

  <details>
  <summary>emojiUpdate</summary>

  NeoBot sends a message to the Mod Channel whenever an emoji is update, containing various emoji details.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Guild Events</summary>

  Guild Events are related to the server itself.
  <blockquote>
  <details>
  <summary>guildBanAdd</summary>

  NeoBot sends a message to the Mod Channel whenever a member is banned.
  </details>

  <details>
  <summary>guildBanRemove</summary>

  NeoBot sends a message to the Mod Channel whenever a member is unbanned.
  </details>

  <details>
  <summary>guildCreate</summary>

  NeoBot sends data about the server to the database upon joining a new server.
  </details>

  <details>
  <summary>guildDelete</summary>

  NeoBot deletes the data of the server from the database when it leaves/gets kicked.
  </details>

  <details>
  <summary>guildMemberAdd</summary>

  NeoBot sends a message to the Mod Channel when a new member joins the server.
  </details>

  <details>
  <summary>guildMemberRemove</summary>

  NeoBot sends a message to the General Channel when a member leaves the server.
  </details>

  <details>
  <summary>guildMemberUpdate</summary>

  NeoBot sends a message to the Mod Channel when a member of the server is updated.
  </details>

  <details>
  <summary>guildUnavailable</summary>

  NeoBot prints a log to the console when a server becomes unavailable due to an outage etc.
  </details>

  <details>
  <summary>guildUpdate</summary>

  NeoBot sends a message to the Mod Channel when the server is updated.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Invite Events</summary>

  Invite Events are related to server invites.
  <blockquote>
  <details>
  <summary>inviteCreate</summary>

  NeoBot sends a message to the Mod Channel whenever a new invite is created.
  </details>

  <details>
  <summary>inviteDelete</summary>

  NeoBot sends a message to the Mod Channel whenever an invite is deleted.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Message Events</summary>

  Message Events are related to messages.
  <blockquote>
  <details>
  <summary>message</summary>

  This event fires every time a message is sent. NeoBot analyses the message, and if the message does not start with the prefix, it ignores the message. If it does start with the prefix, it processes it into a command. See <a href="#commands">Commands</a> for more information.
  </details>

  <details>
  <summary>messageDelete</summary>

  NeoBot sends a message to the Mod Channel whenever a message is deleted.
  </details>

  <details>
  <summary>messageDeleteBulk</summary>

  NeoBot sends a message to the Mod Channel whenever multiple message are deleted. Works well with the `purge` command.
  </details>

  <details>
  <summary>messageReactionAdd - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever a reaction is added to a message.

  -Disabled until later, too annoying for now.
  </details>

  <details>
  <summary>messageReactionRemove - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever a reaction is removed from a message.

  -Disabled until later, too annoying for now.
  </details>

  <details>
  <summary>messageReactionRemoveAll - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever all reactions are removed from a message.
  
  -Disabled until later, too annoying for now.
  </details>

  <details>
  <summary>messageUpdate</summary>

  Whenever a message is edited/updated, NeoBot sends a message to the channel where the updated message is to notify that the message has changed, in order to prevent misinformation or "FAKE NEWS" being spread.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Presence Events</summary>

  Presence Events are related to server presences.
  <blockquote>
  <details>
  <summary>presenceUpdate - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever a user on a server changes presence i.e. 'Online', 'Do Not Disturbe'.
  
  -Disabled until later, too annoying for now.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Ready Events</summary>

  Ready Events are related to the client status.
  <blockquote>
  <details>
  <summary>ready</summary>

  This event activates the crons (weeklyMeme, birthdays, etc.), sets the bot activity to 'Online' with the version number as the status, and sends a log to the console containing information with the bot status.
  </details>
  
  </blockquote>
  
</details>

<details>
  <summary>Role Events</summary>

  Role Events are related to server roles.
  <blockquote>
  <details>
  <summary>roleCreate</summary>

  NeoBot sends a message to the Mod Channel whenever a role is created.
  </details>

  <details>
  <summary>roleDelete</summary>

  NeoBot sends a message to the Mod Channel whenever a role is deleted.
  </details>

  <details>
  <summary>roleUpdate</summary>

  NeoBot sends a message to the Mod Channel whenever a role is updated.
  </details>
  
  </blockquote>
  
</details>

<details>
  <summary>Shard Events</summary>

  Shard Events are related to the client shard.
  <blockquote>
  <details>
  <summary>shardDisconnect</summary>

  NeoBot prints a log to the console when it has been disconnected from the websocket.
  </details>

  <details>
  <summary>shardError</summary>

  NeoBot prints a log to the console whenever there has been an error with the websocket.
  </details>

  <details>
  <summary>shardReconnecting</summary>

  NeoBot prints a log to the console when it is reconnecting to the websocket.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Typing Events</summary>

  Typing Events are related to server typing.
  <blockquote>
  <details>
  <summary>typingStart - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever a user on a server starts typing in a channel.
  
  -Disabled until later, too annoying for now.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Voice State Events</summary>

  Voice State Events are related to server voice state events.
  <blockquote>
  <details>
  <summary>voiceStateUpdate - DISABLED</summary>

  NeoBot sends a message to the Mod Channel whenever a user on a server joins or leaves a voice channel.
  
  -Disabled until later, too annoying for now.
  </details>

  </blockquote>
  
</details>

<details>
  <summary>Webhook Events</summary>

  Webhook Events are related to server channel webhooks.
  <blockquote>
  <details>
  <summary>webhookUpdate</summary>

  NeoBot sends a message to the Mod Channel whenever a webhook on a channel is updated.
  </details>

  </blockquote>
  
</details>

### Error Reporting

If you encounter any issues while using this bot either on Discord or while trying to run the bot yourself, please either use !report on Discord, or report an issue here: [Issues](https://github.com/TheBenEdwards/NeoBot/issues) (Requires a GitHub Account).

_When submitting a report, please try to add a 'how to replicate' section on how the team can try to fix the issue._
_Fake or false reports will be ignored, so only genuine tickets will be reviewed._

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/theBenEdwards/NeoBot/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Always start the branch with `feature`. If not, the Pull Request will be ignored.

<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/TheBenEdwards/NeoBot/blob/main/LICENSE.txt) for more information.

<!-- THE TEAM -->
## The Team

Lead Programmer - Ben Edwards

<!-- CONTACT -->
## Contact

Twitter - [Ben Edwards](https://twitter.com/Edwards_Ben60)

GitHub: [NeoBot](https://github.com/TheBenEdwards/NeoBot)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [An Idiots Guide](https://www.youtube.com/playlist?list=PLR2_rarYLHfg6ZJqq0WTMmI9uLcd7_GRO)
* [Discord.js](https://discord.js.org/)
* [GitHub](https://github.com/)
* [Heroku](https://devcenter.heroku.com/)
* [Img Shields](https://shields.io)

<!-- INVITE NEOBOT -->
## Invite
[Invite NeoBot to your Server](https://discord.com/oauth2/authorize?client_id=587909252887216128&scope=bot&permissions=2147483647)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/theBenEdwards/NeoBot.svg?style=for-the-badge
[contributors-url]: https://github.com/theBenEdwards/NeoBot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/theBenEdwards/NeoBot.svg?style=for-the-badge
[forks-url]: https://github.com/theBenEdwards/NeoBot/network/members
[stars-shield]: https://img.shields.io/github/stars/theBenEdwards/NeoBot.svg?style=for-the-badge
[stars-url]: https://github.com/theBenEdwards/NeoBot/stargazers
[issues-shield]: https://img.shields.io/github/issues/theBenEdwards/NeoBot.svg?style=for-the-badge
[issues-url]: https://github.com/theBenEdwards/NeoBot/issues
[license-shield]: https://img.shields.io/github/license/theBenEdwards/NeoBot.svg?style=for-the-badge
[license-url]: https://github.com/theBenEdwards/NeoBot/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/benjamin-edwards-75b87a196