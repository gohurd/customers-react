import type { CustomerFiltersState } from "../../types/customer/customer-types";

export const CUSTOMER_FILTERS_INITIAL_VALUE: CustomerFiltersState = {
  ageFrom: null,
  ageTo: null,
  gender: null,
  location: null,
};
