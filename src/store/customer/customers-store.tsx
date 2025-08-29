import { useInfiniteQuery } from "@tanstack/react-query";
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
import type { Customer } from "../../types/customer/customer-types";
import { fetchCustomers } from "../../api/customer-api";

type FiltersState = {
  ageFrom: number | null;
  ageTo: number | null;
  gender: number | null;
  location: number | null;
};

const INITIAL_VALUE = {
  filters: {
    ageFrom: null,
    ageTo: null,
    gender: null,
    location: null,
  },
  setFilters: () => {},
  customers: [],
  loading: false,
  error: null,
  fetchNextPage: () => {},
};

type ContextType = {
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
  customers: Customer[];
  loading: boolean;
  error: string | null;
  fetchNextPage: () => void;
};

const Context = createContext<ContextType>(INITIAL_VALUE);

type Props = {
  children: ReactNode;
};

export const CustomersStoreProvider = ({ children }: Props) => {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_VALUE.filters);

  const { data, error, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: [CustomerQueryKey.customers, filters],
    queryFn: (params) => fetchCustomers({ page: params.pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: FetchCustomersResponse) => lastPage.page + 1,
  });

  const customers = (data?.pages ?? []).reduce(
    (acc, curr) => [...acc, ...curr.data],
    [] as Customer[]
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomers = () => useContext(Context);
