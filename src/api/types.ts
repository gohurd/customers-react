import type { Customer } from "../types/customer/customer-types";

export type FetchCustomersResponse = {
  data: Customer[];
  page: number;
  perPage: number;
  total: number;
};
