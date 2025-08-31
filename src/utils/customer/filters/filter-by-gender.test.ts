import { describe, expect, it } from "vitest";
import { filterCustomerByGender } from "./filter-by-gender";

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

describe("filterCustomerByGender", () => {
  it("Returns true if no filter value provided", () => {
    expect(filterCustomerByGender(CUSTOMER)).toBe(true);
  });

  it("Returns true if gender is equal to value", () => {
    expect(filterCustomerByGender(CUSTOMER, CUSTOMER.gender)).toBe(true);
  });

  it("Returns false is gender is not equal to value", () => {
    expect(filterCustomerByGender(CUSTOMER, "NotExisting")).toBe(false);
  });
});
