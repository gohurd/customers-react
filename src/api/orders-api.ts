import orders from "../../data/orders.json";
import type { Order } from "../types/orders/order-types";

export const fetchOrders = async (): Promise<Order[]> => {
  return orders;
};
