import type { Order } from "../../types/orders/order-types";
import { CustomerOrderItem } from "./customer-order-item";

type Props = {
  orders: Order[];
};

export const CustomerDetailsOrders = ({ orders }: Props) => {
  return (
    <div className="md:p-0 mt-2 flex-1 flex flex-col gap-4 min-h-0">
      <h3 className="font-semibold text-lg">Order history</h3>
      <ul className="overflow-y-auto flex flex-col gap-2 pb-4 pr-2">
        {orders.map((order) => (
          <CustomerOrderItem order={order} key={order.number} />
        ))}
      </ul>
    </div>
  );
};
