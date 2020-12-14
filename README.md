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
    <img src="images/logo.png" alt="Logo" width="80" height="80">
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
      <a href="#cloning">Cloning</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li>
          <a href="#environment-variables">Environment Variables</a>
          <ul>
            <li><a href="#bot_token">BOT_TOKEN</a></li>
            <li><a href="#api_key">API_KEY</a></li>
            <li><a href="#api-url">API_URL</a></li>
          </ul>
        </li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#the-team">The Team</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
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
## Cloning

To just 'check out' the project and see how we got the code to work, use `git clone https://github.com/TheBenEdwards/NeoBot`. This will create a completely detached directory for you to do whatever you want to the code. 

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

In order to create a version of this bot you will have to substitute these variables with your own.

#### BOT_TOKEN

The BOT_TOKEN is what nodejs uses to connect your bot to discord. To create a bot token:

1. Create a new bot application at the [https://discord.com/developers/applications](Discord Developer Portal)
2. Go to 'Bot' option
3. Add a new Bot to the app
4. Click on _'Click to Reveal Token_
5. Copy the very long token, and paste in the .env file with BOT_TOKEN

* Define like this:
```sh
BOT_TOKEN=[BOT_TOKEN_HERE]
```

#### API_KEY

API_KEY is the password your API uses in the header to make sure the sender is a permitted user. 

If you do not have an API, either create arrays to subsitute for the api calls, import them and use them instead, or simply remove the API files entirely.

* Define like this:
```sh
API_KEY=[PASSWORD HERE]
```

#### API_URL

API_URL is the link to the API itself. 

Similarily to API_KEY, either create arrays to subsitute for the api calls, import them and use them instead, or simply remove the API files entirely.

* Define like this:
```sh
API_URL=[https://api-url-here/API]
```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```JS
   const API_KEY = 'ENTER YOUR API';
   ```

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

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

Distributed under the MIT License. See `LICENSE` for more information.

<!-- THE TEAM -->
## The Team

Lead Programmer - Ben Edwards

<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)

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