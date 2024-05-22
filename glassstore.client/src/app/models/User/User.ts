import { Basket } from "./Basket";
import { Orders } from "./Orders";

export interface User {
  id: string; // ObjectId
  email: string;
  orders: Orders[];
  basket: Basket;
  roles: number;

}
