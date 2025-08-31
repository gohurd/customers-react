import type { Customer } from "../../../types/customer/customer-types";

export const filterCustomerByLocation = (
  customer: Customer,
  value?: string
) => {
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
};
