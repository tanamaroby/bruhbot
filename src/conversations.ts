import { isNil, map, union } from "lodash";
import { MyContext, MyConversation } from "./app";
import { makeAllMessage } from "./const";
import { specialMembers } from "./members";

const CANCEL_STRING = "/skibidicancel";

export const all = async (conversation: MyConversation, ctx: MyContext) => {
  await ctx.reply(
    `What message would you like to append /all with? Reply to this message with the text you want to send. Type ${CANCEL_STRING} to cancel this request.`
  );
  const from = ctx.message?.from;
  if (isNil(from)) {
    ctx.reply("You need a username!!!!");
    return;
  }
  const { username } = from;
  const { message } = await conversation.waitFrom(from);
  if (isNil(message)) {
    ctx.reply("Message is undefined, please try again!");
    return;
  }
  const { text } = message;
  if (text == CANCEL_STRING) {
    ctx.reply("You have cancelled the command!");
  } else {
    const chatAdmins = await ctx.getChatAdministrators();
    const chatMembers = union(
      map(chatAdmins, (chatAdmin) => chatAdmin.user.username),
      specialMembers
    );
    ctx.reply(makeAllMessage(username ?? "user", chatMembers, text ?? ""), {
      parse_mode: "HTML",
    });
  }
};
