const { Telegraf, Markup } = require("telegraf");
const { token, username } = require("../config/config.js");
const {botStart, botStop,hp,xp,food,pos,status} = require("../bot/bot.js");

const tgBot = new Telegraf(token);

tgBot.start((ctx) => {
    ctx.reply(
        "choose the button",
        Markup.inlineKeyboard([
            Markup.button.callback("bot", "bot"),
            Markup.button.callback("server", "server")
        ])
    );
});

tgBot.action("bot", (ctx) => {
    ctx.replyWithPhoto(
        `https://mc-heads.net/head/${username}`,
        {
            caption: getBotStats(),
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "modules", callback_data: 'modules' },
                        { text: "start", callback_data: 'start' }
                    ],
                    [
                    	{text: "stop", callback_data: 'stop'}
                    ]
                ]
            }
        }
    );
});

tgBot.action("server", (ctx) => {
    ctx.reply("Server button clicked!");
    ctx.answerCbQuery();
});

tgBot.action("modules", (ctx) => {
    ctx.reply("Modules button clicked!");
    ctx.answerCbQuery();
});

tgBot.action("start", (ctx) => {
   botStart();
});

tgBot.action("stop", (ctx) => {
   botStop();
});

tgBot.hears("bot", (ctx) => {
    ctx.reply("Вы написали 'bot' текстом, а не нажали кнопку!");
});

tgBot.launch();

process.once('SIGINT', () => tgBot.stop('SIGINT'));
process.once('SIGTERM', () => tgBot.stop('SIGTERM'));