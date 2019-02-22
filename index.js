console.log("Running Bot");
const Telegraf = require('telegraf'); //import lib

const API_KEY = "749566027:AAFof_Mw7NKfKfCxS4KCCdzJKT0GE0mNq9I"; //Authentication

const bot = new Telegraf(API_KEY); //Create new bot

bot.help(ctx => ctx.reply("Sorry can't help! Bye!")); //same as const Help=ctx => ctx.reply("Hello"); bot.help(Help)

bot.command('hello', ctx => ctx.reply("Hello there!"))
bot.launch();




