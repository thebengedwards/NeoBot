const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const string = 'Hello!';

const boldString = bold(string);
const italicString = italic(string);
const strikethroughString = strikethrough(string);
const underscoreString = underscore(string);
const spoilerString = spoiler(string);
const quoteString = quote(string);
const blockquoteString = blockQuote(string);

//
const { hyperlink, hideLinkEmbed } = require('@discordjs/builders');
const url = 'https://discord.js.org/';

const link = hyperlink(url);
const hiddenEmbed = hideLinkEmbed(url);

//
const { inlineCode, codeBlock } = require('@discordjs/builders');
const jsString = 'const value = true;';

const inline = inlineCode(jsString);
const codeblock = codeBlock(jsString);
const highlighted = codeBlock('js', jsString);

//
const { time } = require('@discordjs/builders');
const date = new Date();

const timeString = time(date);
const relative = time(date, 'R');

//
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const id = '123456789012345678';

const user = userMention(id);
const nickname = memberNicknameMention(id);
const channel = channelMention(id);
const role = roleMention(id);

//
const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

// Raw data that can be used to register a slash command
const rawData = command.toJSON();

//
const command = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user!')
    .addUserOption(option => option.setName('user').setDescription('The user'));

//
const command = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info about a user or a server!')
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('server')
            .setDescription('Info about the server'));