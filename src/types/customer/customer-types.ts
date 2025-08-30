export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  country: string;
  city: string;
  state: string;
  postCode: string;
  street: string;
  streetNumber: string;
  id: number;
  age: number;
};

export type FetchCustomersParams = {
  page: number;
  ageFrom?: number;
  ageTo?: number;
  gender?: number;
  location?: string;
};

export type CustomerFiltersState = {
  ageFrom: number | null;
  ageTo: number | null;
  gender: number | null;
  location: string | null;
};
