import { describe, expect, it } from "vitest";
import { filterCustomerByAgeFrom } from "./filters-by-age-from";

const CUSTOMER = {
  id: 4432,
  firstName: "Devora",
  lastName: "Waller",
  email: "demonstration1926@yandex.com",
  gender: "Male",
  country: "Lesotho",
  city: "South Pasadena",
  state: "Kansas",
  postCode: "64567",
  street: "Judson",
  streetNumber: "1179",
  age: 22,
} as const;

describe("filterCustomerByAgeFrom", () => {
  it("Returns true if no filter value provided", () => {
    expect(filterCustomerByAgeFrom(CUSTOMER)).toBe(true);
  });

  it("Returns true if age is equal to value", () => {
    expect(filterCustomerByAgeFrom(CUSTOMER, CUSTOMER.age)).toBe(true);
  });

  it("Returns true if age is higher than value", () => {
    expect(filterCustomerByAgeFrom(CUSTOMER, CUSTOMER.age - 1)).toBe(true);
  });

  it("Returns false if age is smaller than value", () => {
    expect(filterCustomerByAgeFrom(CUSTOMER, CUSTOMER.age + 1)).toBe(false);
  });
});
