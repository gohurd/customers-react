import type { Customer } from "../../../types/customer/customer-types";

export const filterCustomerByGender = (customer: Customer, value?: string) => {
  if (!value) {
    return true;
  }

  return customer.gender === value;
};
