const Telegraf = require('telegraf'); //import lib
const Markup = require('telegraf/markup');


const URL = process.env.URL || 'https://garagechatbot.herokuapp.com';
const PORT = process.env.PORT || 3000;
const API_TOKEN = "749566027:AAFof_Mw7NKfKfCxS4KCCdzJKT0GE0mNq9I"; //Authentication

const bot = new Telegraf(API_TOKEN); //Create new bot

bot.help(ctx => ctx.reply("Sorry can't help! Bye!")); //same as const Help=ctx => ctx.reply("Hello"); bot.help(Help)
bot.hears(/hello/i, ctx => ctx.reply('Hello there!')); // /hello/i = (/../i: Regular Experession+case-sensitive)
bot.start(ctx => ctx.reply("Hello! I am Handsome Chatbot! Please enter /splitbill to continue...."));
bot.command('hi', ctx => ctx.reply('Please enter a number:')
  .then((ctx) => {const number = parseInt(ctx.message.text);})
  .then(() => ctx.reply(ctx.message))
);
bot.command('splitbill', ctx => ctx.reply('Who are the people in the bill? /addPeople name1,name2'));

// bot.hears(/[0-9]+/, ctx => {
//     const number = parseInt(ctx.message.text);
//     ctx.reply('Enter name1:');
// });

let names, amount;

bot.command('addPeople', ctx => {
  names = ctx.message.text.replace('/addPeople', '').split(',').map(s => s.trim());
  ctx.reply('Total Amount of the bill? /totalAmount amount');
  replySplitResult(ctx);
});
bot.command('totalAmount', ctx => {
  amount = parseFloat(ctx.message.text.replace('/totalAmount', '').trim());
  replySplitResult(ctx);
});

const replySplitResult = (ctx) => {
    if (!names || !amount) {
        return;
    }

    ctx.reply(`Each person should pay ${amount / names.length}`);
};


bot.hears('> Half of group member', ctx => ctx.reply('That is GREAT!!\nTell me who is in the bill?!', Markup
    .keyboard([])
    .oneTime()
    .resize()
    .extra()
))


if (process.env.NODE_ENV === "production") {
  console.log("Running with webhook");
  bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
  bot.startWebhook(`/bot${API_TOKEN}`, null, PORT);
} else {
  console.log("Running locally");
  bot.launch();
}