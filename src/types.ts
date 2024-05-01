interface MyUser {
  username?: string;
  messageCount: number;
}

export interface SessionData {
  users: MyUser[];
}
