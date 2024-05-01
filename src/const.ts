import { filter, join, map } from "lodash";

export const introductionMessage = `Hello! I am a Telegram bot called BRUHSKIBIDIXD.
I'm coded by some developer from 42 piscine.

<b>Commands:</b>

/start - Starts the bot!
/help - Shows a bunch of commands available
/all message - Pings everyone in the group with the message!
/skibidi - Plays the skibidi
/count - Counts the number of times the user has spoken in this chat`;

export const helpMessage = `Hi! Here are the commands available in this bot and how to use them.

<b>Commands:</b>

/start - Starts the bot!
Example: <code>/start</code>

/help - Shows a bunch of commands available
Example: <code>/help</code>

/all message - Pings everyone in the group with the message specified
Example: <code>/all</code>

/skibidi - Plays the skibidi
Example: <code>/skibidi</code>

/count - Counts the number of times the user has spoken in this chat
Example: <code>/count</code>`;

export const skibidiMessage =
  "<b>Skibidi bob bop bop yes YES, Skibidi Bapidi BEE BEEP</b>";

export const makeAllMessage = (
  pinger: string,
  users: (string | undefined)[],
  message: string
) => {
  const base = `Hello all! @${pinger} has pinged all of you with the following message:\n\n<b>${message}</b>\n`;
  const all = join(
    map(filter(users, Boolean), (user) => `@${user}`),
    " "
  );
  return `${base}\n${all}`;
};
