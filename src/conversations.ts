import { map, union } from "lodash";
import { MyContext, MyConversation } from "./app";
import { makeAllMessage } from "./const";
import { specialMembers } from "./members";

export const all = async (conversation: MyConversation, ctx: MyContext) => {
  await ctx.reply(
    "What message would you like to append /all with? Reply to this message with the text you want to send"
  );
  const { message } = await conversation.wait();
  const chatAdmins = await ctx.getChatAdministrators();
  const from = ctx.message?.from?.username;
  const chatMembers = union(
    map(chatAdmins, (chatAdmin) => chatAdmin.user.username),
    specialMembers
  );
  ctx.reply(makeAllMessage(from ?? "user", chatMembers, message?.text ?? ""), {
    parse_mode: "HTML",
  });
};
