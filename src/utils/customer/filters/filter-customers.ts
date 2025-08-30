import type { Customer } from "../../../types/customer/customer-types";
import { filterCustomerByAgeFrom } from "./filters-by-age-from";
import { filterCustomerByAgeTo } from "./filter-by-age-to";
import { filterCustomerByGender } from "./filter-by-gender";
import { filterCustomerByLocation } from "./filter-by-location";

const FILTERS = {
  ageFrom: filterCustomerByAgeFrom,
  ageTo: filterCustomerByAgeTo,
  gender: filterCustomerByGender,
  location: filterCustomerByLocation,
} as const;

type FilterValues = {
  ageFrom?: number;
  ageTo?: number;
  gender?: number;
  location?: string;
};

export const filterCustomers = (
  customers: Customer[],
  values: FilterValues
) => {
  return customers.filter((customer) => {
    return Object.entries(values).every(([key, value]) => {
      const filterFunc = FILTERS[key as keyof FilterValues];

      if (!filterFunc && value) {
        throw new Error("Filter not implemented");
      }

      return filterFunc(customer, value);
    });
  });
};
