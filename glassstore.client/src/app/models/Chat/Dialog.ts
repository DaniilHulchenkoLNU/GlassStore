import { User } from "../User/User";

export interface Dialog {
  message: string;
  senderUser?: User | null;
  dateTime: Date;
}