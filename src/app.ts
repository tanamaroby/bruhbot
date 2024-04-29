import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { introductionMessage } from "./const";

dotenv.config();
const bot: Telegraf = new Telegraf(process.env.BOT_TOKEN as string, {});

bot.start((ctx) => {
  ctx.reply(introductionMessage, {
    parse_mode: "HTML",
  });
});

bot.help((ctx) => {
  ctx.reply("Send /start to receive a greeting!");
  ctx.reply("Send /help to obtain all the bots commands");
  ctx.reply(
    "Send /all <message> to ping everyone in this chat with the message"
  );
});

bot.command("all", (ctx) => {
  ctx.reply("You have selected the all command!");
});

bot.catch((err, ctx) => {
  console.log("Bot has encountered an error for " + ctx.updateType, err);
});

bot
  .launch()
  .then(() => console.log("Bot started!"))
  .catch((err) => console.error(err));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
