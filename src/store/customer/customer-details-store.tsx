import { useQuery } from "@tanstack/react-query";
import { fetchCustomerById } from "../../api/customer-api";
import { CustomerQueryKey } from "../../constants/customer/query-constnats";
import type { Customer } from "../../types/customer/customer-types";
import { fetchOrders } from "../../api/orders-api";
import type { Order } from "../../types/orders/order-types";

type Props = {
  id?: number;
};

export const useCustomerDetails = ({ id }: Props) => {
  const { data, error } = useQuery<Customer | null>({
    queryFn: () => {
      if (!id) {
        return null;
      }

      return fetchCustomerById(id);
    },
    enabled: !!id,
    queryKey: [CustomerQueryKey.customers, { id }],
    retry: false,
  });

  const { data: ordersData, error: ordersError } = useQuery<Order[]>({
    queryFn: fetchOrders,
    queryKey: [CustomerQueryKey.customerOrders, { id }],
    retry: false,
  });

  return {
    customer: data,
    error: error?.message,
    orders: ordersData,
    ordersError: ordersError?.message,
  };
};
