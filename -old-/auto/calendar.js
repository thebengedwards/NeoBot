//Neos Calendar Dates go here
let NewYear = new cron.CronJob('00 01 00 01 00 *', () =>
{
  client.channels.get(general).send("🎉 HAPPY NEW YEAR EVERYONE 🎉");
});
NewYear.start()
let Halloween = new cron.CronJob('00 00 08 31 09 *', () =>
{
  client.channels.get(general).send("🎃 HAPPY HALLOWEEN EVERYONE 🎃");
});
Halloween.start()
let Christmas = new cron.CronJob('00 00 08 25 11 *', () =>
{
  client.channels.get(general).send("🎅 MERRY CHRISTMAS EVERYONE 🎅");
});
Christmas.start()