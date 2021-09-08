const { MessageEmbed } = require("discord.js");
const settings = require("../settings.json");
const { Reply } = require("../functions/reply");
const alertEmbed = require('../components/embeds/alertEmbed');
const commandEmbed = require('../components/embeds/commandEmbed');

exports.run = async (client, interaction, options, perms) => {
  try {
    if (!options) {
      const embed = new MessageEmbed(commandEmbed)

      embed.setDescription('Help')
      embed.addFields(
        { name: `Below are all the commands for NeoBot.`, value: `[Use ${settings.prefix}help <command name> for details]` },
        { name: `Games`, value: client.commands.filter(item => item.command.permLevel <= perms).map(item => item.command.name) },
        { name: 'More Help Commands:', value: 'help \nhelp <command> \nhelp channels \nhelp events \nhelp roles' },
      )
      Reply(client, interaction, embed)
    } else {
      let command = options.find(item => item.name === 'details').value

      const embed = new MessageEmbed(commandEmbed)

      if (client.commands.has(command)) {
        clientCommand = client.commands.get(command)
        embed.setDescription(`Help with: ${clientCommand.command.name}`)
        embed.addFields(
          { name: 'Name', value: `${clientCommand.command.name}` },
          { name: 'About', value: `${clientCommand.command.description}` },
          { name: 'Fields', value: `${clientCommand.command.options ? clientCommand.command.options.length : '0'}` },
        )
        Reply(client, interaction, embed)
      } else if (command === 'channels' || command === 'events' || command === 'roles') {
        switch (command) {
          case 'channels':
            embed.setDescription('Channels Information')
            embed.addFields(
              { name: 'NeoBot Channels are set channels that NeoBot specifically uses to increase functionality', value: 'This guide will explain what each channel \'type\' actually does.' },
              { name: 'Welcome', value: 'Welcome Channel where people first join. Neo monitors for new members' },
              { name: 'Mod', value: 'Moderator functions are sent to this channel. This should be a mod-only channel' },
              { name: 'General', value: 'General text channel. Polls, Birthdays and general messages are sent here. Used 90% of the time.' },
              { name: 'Memes', value: 'Memes are sent here' },
              { name: 'Game', value: 'Game Updates are sent here' },
              { name: 'Update', value: 'NeoBot Updates are sent here' },
              { name: 'What if my server has less than 6 channels?', value: 'Do not worry, you can simply assign a channel to multiple options, for example if you want memes and general on the same channel, simply use the same ID\'s when setting up the channels through NeoBot.' },
              { name: 'What if my server has more than 6 channels', value: 'In this case you will have to decide which channels NeoBot will send certain messages to and which not.' },
              { name: 'To disable a Channel simply set it to 0', value: 'Anything else will make NeoBot believe the Channel is active and will try to use it.' },
            )
            Reply(client, interaction, embed)
            break;
          case 'events':
            embed.setDescription('Events Information')
            embed.addFields(
              { name: 'NeoBot Events are time based messages that occur based on a timer', value: 'This guide will explain what each event \'type\' actually does.' },
              { name: 'WeeklyMemes', value: 'If Enabled, NeoBot will send a meme to the Memes Channel every week at 20:00 GMT on a Friday.' },
              { name: 'Birthdays', value: 'If Enabled, NeoBot will send a \'Happy Birthday\' Message into the General Channel whenever there is a birthday at 08:00 GMT.' },
              { name: 'Calendar', value: 'If Enabled, NeoBot will send a special calendar day message at 08:00 of the special day into the General Channel.' },
              { name: 'Polls', value: 'If Enabled, NeoBot will send a poll asking if anyone wants to play a specific game at 20:00 GMT on a Friday into the General Channel' },
              { name: 'What if I haven\'t set up the channels used by these functions?', value: 'They will be sent nowehere. You need to have the channels set up for these functions to work.' },
              { name: 'I have set up a channel but nothing is coming through?', value: 'It is highly likely you have set up the channel incorrectly, if you need more help use !report to rpeort the issue.' },
              { name: 'Birthdays is a customizable Event type. Use \'!birthdayAdd\' to add a birthday alert. Use like this:', value: '!birthdayAdd <DiscordID> <First Name> <Last Name> <YYYY-MM-DD> <Gender>' },
            )
            Reply(client, interaction, embed)
            break;
          case 'roles':
            embed.setDescription('Roles Information')
            embed.addFields(
              { name: 'NeoBot Roles are set roles that NeoBot uses to control who can use what functions', value: 'This guide will explain what each role has access to.' },
              { name: 'Admin', value: 'Has Acces to all functions' },
              { name: 'Mods', value: 'Has Access to most fucntions' },
              { name: 'Members', value: 'Only has access to safe functions' },
              { name: 'What if my server has less than 3 roles?', value: 'Worry not, if you configure any role ID with the same role ID used for another role, NeoBot will simply default to the most dominant role. In short, dont worry about it, jsut assigne everyone the member role.' },
              { name: 'What if my server has more than 3 roles?', value: 'In this case you will have to: either remove some roles, or set the three roles you would like people to have to access the bot, then assign those roles accordingly. Be carful when doing this, as you dont want the wrong people accessing NeoBot.' },
              { name: 'To disable a Role simply set it to 0', value: 'Anything else will make NeoBot believe the Role is active and will try to use it.' },
            )
            Reply(client, interaction, embed)
            break;
          default:
            throw 'err'
        }
      } else {
        const embed = new MessageEmbed(alertEmbed)

        embed.setDescription(`Command does not extist`)
        Reply(client, interaction, embed)
      }
    }
  } catch (err) {
    console.log(err)
  }
};

exports.command = {
  description: 'Displays all the available commands for your permission level.',
  enabled: true,
  name: 'help',
  options: [
    { name: 'details', description: 'The name of the command or functionality you need more details for', required: false, type: 3 },
  ],
  permLevel: 1
};
