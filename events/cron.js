const Discord = require('discord.js')
const cron = require('cron')
const settings = require('../settings.json');
const dates = require('../dates')

const { RandomReddit } = require('random-reddit')
const reddit = new RandomReddit({
    username: 'reelablezulu761',
    password: 'Northcheese3191!',
    app_id: 'pb4t17XAuDVTGA',
    api_secret: 'x5fAKvxSdqhbZW7SMOLKhRwIRwDMsg'
  });

module.exports = client => {
    dates.forEach((event) => {
        if(event.eventType === 'Birthday') {
            let birthday = new cron.CronJob(`${event.cron}`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Birthday')
                embed.addField(`🎂 ${event.fName.toUpperCase()}, IT\'S YOUR BIRTHDAY! 🎂`, `Can we all please wish <@${event.id}> a happy Birthday!!!`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            birthday.start()
        } else if(event.eventType === 'Calendar') {
            let calendar = new cron.CronJob(`${event.cron}`, () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                embed.setDescription('Calendar')
                embed.addField(`${event.id} HAPPY ${event.lName.toUpperCase()} EVERYONE! ${event.id}`,`@everyone, have a great ${event.lName}.`)
                return client.channels.cache.get(settings.general).send({ embed });
            });
            calendar.start()
        } else if(event.eventType === 'WeeklyMeme') {
            let weeklyMeme = new cron.CronJob(`${event.cron}`, async () => {
                const eventEmbed = require('../embeds/eventEmbed')
                const embed = new Discord.MessageEmbed(eventEmbed)

                const post = await reddit.getPost('the_donald')
                console.log(post) // returns the reddit post object

                // let options = {
                //     imageOnly: true,
                //     allowNSFW: true
                //  };
                // await reddit.getPost('memes', options).then(post => {

                //     var postTitle = post.title
                //     var content = post.text
                //     var postURL = post.permalink
                //     var postAuthor = post.author
                //     var upvotes = post.upvotes
                //     var downvotes = post.downvotes

                //     embed.setDescription('Weekly Meme')
                //     embed.addField(`${postTitle}`,`Posted by: ${postAuthor}`)
                //     embed.setImage(postURL)
                //     return client.channels.cache.get(settings.memes).send({ embed });
                // })
            });
            weeklyMeme.start()
        } else {
            const alertEmbed = require('../embeds/alertEmbed')
            const embed = new Discord.MessageEmbed(alertEmbed)

            embed.setDescription('Error')
            embed.addField(`Error with an event`,`An event not matching any types has been activated. Check the console for details`)
            return client.channels.cache.get(settings.mod).send({ embed });
        }
    })
};