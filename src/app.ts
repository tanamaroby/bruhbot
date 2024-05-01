import {
  Conversation,
  ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { freeStorage } from "@grammyjs/storage-free";
import dotenv from "dotenv";
import { Bot, Context, session, SessionFlavor } from "grammy";
import { find, includes, isNil, map, union } from "lodash";
import { helpMessage, introductionMessage, skibidiMessage } from "./const";
import { all } from "./conversations";
import { SessionData } from "./types";

dotenv.config();
export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<SessionData>;
export type MyConversation = Conversation<MyContext>;
const bot = new Bot<MyContext>(process.env.BOT_TOKEN as string);

bot.use(
  session({
    initial: () => ({ users: [] }),
    storage: freeStorage<SessionData>(bot.token),
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

/* CHAT COUNT */
bot.command("count", (ctx) => {
  const from = ctx.from?.username;
  if (isNil(from)) {
    ctx.reply("You do not have a username XD LELELEL. Please make one!");
    return;
  }
  const user = find(ctx.session.users, (user) => user.username == from);
  if (isNil(user)) {
    ctx.session.users = union(ctx.session.users, [
      { username: from, messageCount: 1 },
    ]);
    ctx.reply(`The user @${from} has only spoken in this chat once`);
    return;
  }
  ctx.reply(
    `The user @${from} has spoken in this chat ${user?.messageCount} times!`
  );
});

bot.on("message", async (ctx) => {
  const from = ctx.from.username;
  if (!isNil(from)) {
    if (!includes(map(ctx.session.users, "username"), from)) {
      ctx.session.users = union(ctx.session.users, [
        { username: from, messageCount: 1 },
      ]);
    } else {
      ctx.session.users = map(ctx.session.users, (user) => {
        const { username, messageCount } = user;
        if (username == from) {
          return {
            username,
            messageCount: messageCount + 1,
          };
        }
        return user;
      });
    }
  }
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
