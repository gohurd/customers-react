import type { Customer } from "../../../types/customer/customer-types";

export const filterCustomerByAgeTo = (customer: Customer, value?: number) => {
  if (!value) {
    return true;
  }

  return customer.age <= value;
};
