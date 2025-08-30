import type { Order } from "../../types/orders/order-types";

type Props = {
  order: Order;
};

export const CustomerOrderItem = ({ order }: Props) => {
  const createdAt = new Date(order.createdAt);

  return (
    <li className="flex items-center justify-between p-4 border border-gray-200 rounded-lg  transition-colors">
      <div className="flex items-center gap-4">
        <div>
          <p className="font-medium text-gray-900">Order #{order.number}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              {createdAt.toISOString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-900">${order.amount}</span>
      </div>
    </li>
  );
};
