import customers from "../../data/customers.json";
import type { FetchCustomersParams } from "../types/customer/customer-types";
import type { FetchCustomersResponse } from "./types";

const PER_PAGE = 25;

export const fetchCustomers = async ({
  page,
}: FetchCustomersParams): Promise<FetchCustomersResponse> => {
  const start = Math.max(page - 1, 0);

  const skip = start * PER_PAGE;

  return {
    data: customers.slice(skip, skip + PER_PAGE),
    page,
    perPage: PER_PAGE,
    total: customers.length,
  };
};
