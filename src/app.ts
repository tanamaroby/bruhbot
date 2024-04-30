import dotenv from "dotenv";
import {
  helpMessage,
  introductionMessage,
  makeAllMessage,
  skibidiMessage,
} from "./const";
import { Bot, Context, MemorySessionStorage } from "grammy";
import { chatMembers, ChatMembersFlavor } from "@grammyjs/chat-members";
import { ChatMember } from "grammy/types";
import { get, map, union } from "lodash";
import { specialMembers } from "./members";

dotenv.config();
type MyContext = Context & ChatMembersFlavor;
const adapter = new MemorySessionStorage<ChatMember>();
const bot = new Bot<MyContext>(process.env.BOT_TOKEN as string);
bot.use(chatMembers(adapter));

bot.command("start", (ctx) => {
  ctx.reply(introductionMessage, {
    parse_mode: "HTML",
  });
});

bot.command("help", (ctx) => {
  ctx.reply(helpMessage, {
    parse_mode: "HTML",
  });
});

bot.command("all", async (ctx) => {
  const chatAdmins = await ctx.getChatAdministrators();
  const from = await ctx.message?.from?.username;
  const message = await ctx.message?.text;
  const chatMembers = union(
    map(chatAdmins, (chatAdmin) => chatAdmin.user.username),
    specialMembers
  );
  ctx.reply(makeAllMessage(from ?? "user", chatMembers, message ?? ""), {
    parse_mode: "HTML",
  });
});

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
