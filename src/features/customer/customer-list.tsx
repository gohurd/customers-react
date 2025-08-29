import { Link } from "react-router";
import { CustomerListItem } from "./customer-list-item";
import { useRef, type SyntheticEvent } from "react";
import { useCustomers } from "../../store/customer/customers-store";
import type { Customer } from "../../types/customer/customer-types";

export const CustomersList = () => {
  const { customers, fetchNextPage, error } = useCustomers();

  const handleScroll = (e: SyntheticEvent) => {
    const container = e.currentTarget;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollHeight - scrollTop - clientHeight <= 0) {
      fetchNextPage();
    }
  };

  const parentRef = useRef(null);

  const renderCustomer = (customer: Customer) => {
    return (
      <Link to={`./${customer.id}`} key={customer.id}>
        <CustomerListItem customer={customer} />
      </Link>
    );
  };

  return (
    <section
      className="w-full mt-4 flex-1 overflow-y-auto py-4"
      onScroll={handleScroll}
      ref={parentRef}
    >
      {error && <span className="text-xl text-orange-500">{error}</span>}
      {!customers.length && !error && <span>No results found</span>}
      {!!customers.length && (
        <ul className={`flex flex-col gap-2 w-full p-1 relative`}>
          {customers.map(renderCustomer)}
        </ul>
      )}
    </section>
  );
};
