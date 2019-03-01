console.log("Running Bot");
const Telegraf = require('telegraf'); //import lib
const URL = process.env.URL || 'https://garagechatbot.herokuapp.com';
const PORT = process.env.PORT || 3000;

const APIKEY = require('../API_KEY');

const bot = new Telegraf(APIKEY); //Create new bot
bot.telegram.setWebhook(`${URL}/bot${APIKEY}`);
bot.startWebhook(`/bot${APIKEY}`, null, PORT);

bot.help(ctx => ctx.reply("Sorry can't help! Bye!")); //same as const Help=ctx => ctx.reply("Hello"); bot.help(Help)


bot.hears(/hello/i, ctx => ctx.reply('Hello there!')); // /hello/i = (/../i: Regular Experession+case-sensitive)
bot.launch();





