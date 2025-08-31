import { filterCustomers } from "./filter-customers";
import type { Customer } from "../../../types/customer/customer-types";
import { describe, expect, it } from "vitest";

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    age: 30,
    gender: "male",
    country: "USA",
    city: "New York",
    state: "NY",
    postCode: "10001",
    street: "Main St",
    streetNumber: "123",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    age: 25,
    gender: "female",
    country: "USA",
    city: "Los Angeles",
    state: "CA",
    postCode: "90001",
    street: "Sunset Blvd",
    streetNumber: "456",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    age: 40,
    gender: "male",
    country: "USA",
    city: "Chicago",
    state: "IL",
    postCode: "60601",
    street: "Michigan Ave",
    streetNumber: "789",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice@example.com",
    age: 35,
    gender: "female",
    country: "USA",
    city: "New York",
    state: "NY",
    postCode: "10002",
    street: "5th Ave",
    streetNumber: "101",
  },
];

describe("filterCustomers", () => {
  it("Filters all customers when no filters are applied", () => {
    const filtered = filterCustomers(MOCK_CUSTOMERS, {});
    expect(filtered).toEqual(MOCK_CUSTOMERS);
  });

  describe("Age filters", () => {
    it("Filters customers by minimum age", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, { ageFrom: 30 });
      expect(filtered.map((c) => c.id)).toEqual([1, 3, 4]);
    });

    it("Filters customers by maximum age", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, { ageTo: 35 });
      expect(filtered.map((c) => c.id)).toEqual([1, 2, 4]);
    });

    it("Filters customers by age range", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, {
        ageFrom: 30,
        ageTo: 35,
      });
      expect(filtered.map((c) => c.id)).toEqual([1, 4]);
    });
  });

  describe("Gender filters", () => {
    it("Filters customers by gender", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, { gender: "male" });
      expect(filtered.map((c) => c.id)).toEqual([1, 3]);
    });
  });

  describe("Location filters", () => {
    it("Filters customers by city", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, {
        location: "New York",
      });
      expect(filtered.map((c) => c.id)).toEqual([1, 4]);
    });

    it("Filters customers by street", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, {
        location: "Michigan",
      });
      expect(filtered.map((c) => c.id)).toEqual([3]);
    });
  });

  describe("Combined filters", () => {
    it("Filters customers by multiple criteria", () => {
      const filtered = filterCustomers(MOCK_CUSTOMERS, {
        ageFrom: 30,
        gender: "female",
        location: "New York",
      });
      expect(filtered.map((c) => c.id)).toEqual([4]);
    });
  });

  it("Throws an error for unsupported filter", () => {
    expect(() =>
      // @ts-expect-error Testing invalid filter
      filterCustomers(MOCK_CUSTOMERS, { invalidFilter: "value" })
    ).toThrow("Filter not implemented");
  });
});
