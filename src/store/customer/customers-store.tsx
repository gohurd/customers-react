import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { CustomerQueryKey } from "../../constants/customer/query-constnats";
import type { FetchCustomersResponse } from "../../api/types";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type {
  Customer,
  CustomerFiltersState,
} from "../../types/customer/customer-types";
import { fetchCustomers } from "../../api/customer-api";
import { CUSTOMER_FILTERS_INITIAL_VALUE } from "../../constants/customer/filters";

const INITIAL_VALUE = {
  filters: CUSTOMER_FILTERS_INITIAL_VALUE,
  setFilters: () => {},
  customers: [],
  loading: false,
  error: null,
  fetchNextPage: () => {},
  resetFilters: () => {},
  total: null,
  hasActiveFilters: false,
  refetch: () => {},
};

type ContextType = {
  filters: CustomerFiltersState;
  setFilters: Dispatch<SetStateAction<CustomerFiltersState>>;
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchNextPage: () => void;
  resetFilters: () => void;
  total: null | number;
  hasActiveFilters: boolean;
  refetch: () => void;
};

const Context = createContext<ContextType>(INITIAL_VALUE);

type Props = {
  children: ReactNode;
};

export const CustomersStoreProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState<CustomerFiltersState>(
    INITIAL_VALUE.filters
  );

  const { data, error, fetchNextPage, isLoading, refetch } = useInfiniteQuery({
    queryKey: [CustomerQueryKey.customers, filters],
    queryFn: (params) =>
      fetchCustomers({
        page: params.pageParam,
        ...(filters.ageFrom !== null && { ageFrom: filters.ageFrom }),
        ...(filters.ageTo !== null && { ageTo: filters.ageTo }),
        ...(filters.gender !== null && { gender: filters.gender }),
        ...(filters.location && { location: filters.location }),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: FetchCustomersResponse) => lastPage.page + 1,
    placeholderData: keepPreviousData,
    retry: false,
  });

  const pages = data?.pages ?? [];

  const customers = pages.reduce(
    (acc, curr) => [...acc, ...curr.data],
    [] as Customer[]
  );

  const resetFilters = () => setFilters(INITIAL_VALUE.filters);

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) =>
      CUSTOMER_FILTERS_INITIAL_VALUE[key as keyof CustomerFiltersState] !==
      value
  );

  return (
    <Context.Provider
      value={{
        customers,
        error: error?.message || null,
        fetchNextPage,
        filters,
        setFilters,
        loading: isLoading,
        resetFilters,
        total: pages[0]?.total || null,
        hasActiveFilters,
        refetch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomers = () => useContext(Context);
