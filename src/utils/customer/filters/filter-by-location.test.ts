import { describe, expect, it } from "vitest";
import { filterCustomerByLocation } from "./filter-by-location";

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

describe("filterCustomerByLocation", () => {
  it("Returns true if no filter value provided", () => {
    expect(filterCustomerByLocation(CUSTOMER)).toBe(true);
  });

  it("Returns true if country matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.country)).toBe(true);
  });

  it("Returns true if city matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.city)).toBe(true);
  });

  it("Returns true if state matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.state)).toBe(true);
  });

  it("Returns true if postCode matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.postCode)).toBe(true);
  });

  it("Returns true if street matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.street)).toBe(true);
  });

  it("Returns true if streetNumber matches to value", () => {
    expect(filterCustomerByLocation(CUSTOMER, CUSTOMER.streetNumber)).toBe(
      true
    );
  });

  it("Returns false if non of the address parts match to value", () => {
    expect(
      filterCustomerByLocation(CUSTOMER, "SomeNotExistingAddressPart")
    ).toBe(false);
  });
});
