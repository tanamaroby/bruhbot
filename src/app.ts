import { Context, Telegraf } from "telegraf";

const bot: Telegraf = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  ctx.reply("Hello! " + (ctx.from.first_name ?? "User") + "!");
});

bot.help((ctx) => {
  ctx.reply("Send /start to receive a greeting!");
  ctx.reply("Send /help to obtain all the bots commands");
  ctx.reply(
    "Send /all <message> to ping everyone in this chat with the message"
  );
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
