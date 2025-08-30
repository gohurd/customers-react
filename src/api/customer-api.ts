import customers from "../../data/customers.json";
import type {
  Customer,
  FetchCustomersParams,
} from "../types/customer/customer-types";
import type { FetchCustomersResponse } from "./types";

const PER_PAGE = 25;

const FILTERS = {
  ageFrom: (customer: Customer, value?: number) => {
    if (!value) {
      return true;
    }

    return customer.age >= value;
  },
  ageTo: (customer: Customer, value?: number) => {
    if (!value) {
      return true;
    }

    return customer.age <= value;
  },
  gender: (customer: Customer, value?: string) => {
    if (!value) {
      return true;
    }

    return customer.gender === value;
  },
  location: (customer: Customer, value?: string) => {
    if (!value) {
      return true;
    }

    const customerLocationDetails = [
      customer.city,
      customer.country,
      customer.postCode,
      customer.state,
      customer.street,
      customer.streetNumber,
    ];

    const lowerCasedValue = value.toLowerCase();

    return customerLocationDetails.some((customerLocation) =>
      customerLocation.toLocaleLowerCase().includes(lowerCasedValue)
    );
  },
};

export const fetchCustomers = async ({
  page,
  ...filters
}: FetchCustomersParams): Promise<FetchCustomersResponse> => {
  const start = Math.max(page - 1, 0);

  const skip = start * PER_PAGE;

  const filtered = customers.filter((customer) =>
    Object.entries(filters).every(([key, value]) => {
      const filterFunc = FILTERS[key as keyof typeof FILTERS];

      if (!filterFunc && value) {
        throw new Error("Filter not implemented");
      }

      return filterFunc(customer, value);
    })
  );

  return {
    data: filtered.slice(skip, skip + PER_PAGE),
    page,
    perPage: PER_PAGE,
    total: filtered.length,
  };
};
