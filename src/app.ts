import {
  Conversation,
  ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import dotenv from "dotenv";
import { Bot, Context, session } from "grammy";
import { helpMessage, introductionMessage, skibidiMessage } from "./const";
import { all } from "./conversations";

dotenv.config();
export type MyContext = Context & ConversationFlavor
export type MyConversation = Conversation<MyContext>;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN as string);

bot.use(
  session({
    initial: () => ({}),
  })
);

bot.use(conversations());

/* START */
bot.command("start", (ctx) => {
  ctx.reply(introductionMessage, {
    parse_mode: "HTML",
  });
});

/* HELP */
bot.command("help", (ctx) => {
  ctx.reply(helpMessage, {
    parse_mode: "HTML",
  });
});

/* ALL */
bot.use(createConversation(all));
bot.command("all", async (ctx) => {
  const groupType = (await ctx.getChat()).type;
  if (groupType == "private") {
    ctx.reply("You can only use this command in a group!");
    return;
  }
  await ctx.conversation.enter("all");
});

/* SKIBIDI */
bot.command("skibidi", (ctx) => {
  ctx.reply(skibidiMessage, {
    parse_mode: "HTML",
  });
});

bot.catch((err) => {
  console.error(err);
});

bot
  .start({
    allowed_updates: ["chat_member", "message"],
  })
  .then(() => console.log("Bot started!"))
  .catch((err) => console.error(err));
