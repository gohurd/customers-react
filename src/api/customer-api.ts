import customers from "../../data/customers.json";
import type {
  Customer,
  FetchCustomersParams,
} from "../types/customer/customer-types";
import { filterCustomers } from "../utils/customer/filters/filter-customers";
import type { FetchCustomersResponse } from "./types";

const PER_PAGE = 25;

export const fetchCustomers = async ({
  page,
  ...filters
}: FetchCustomersParams): Promise<FetchCustomersResponse> => {
  const start = Math.max(page - 1, 0);

  const skip = start * PER_PAGE;

  const filtered = filterCustomers(customers, filters);

  return {
    data: filtered.slice(skip, skip + PER_PAGE),
    page,
    perPage: PER_PAGE,
    total: filtered.length,
  };
};

export const fetchCustomerById = async (id: number): Promise<Customer> => {
  const customer = customers.find((customer) => customer.id === id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};
