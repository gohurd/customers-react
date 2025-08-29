import { useRef, type SyntheticEvent } from "react";
import { useCustomers } from "../../store/customer/customers-store";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { Link } from "react-router";
import { CustomerListItem } from "./customer-list-item";

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

  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
  });

  const renderVirtualItem = (virtualItem: VirtualItem) => {
    const customer = customers[virtualItem.index];

    return (
      <Link
        to={`./${customer.email}`}
        key={virtualItem.key}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${virtualItem.size}px`,
          transform: `translateY(${virtualItem.start}px)`,
          padding: "4px",
        }}
      >
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
        <ul
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className={`flex flex-col w-full relative`}
        >
          {rowVirtualizer.getVirtualItems().map(renderVirtualItem)}
        </ul>
      )}
    </section>
  );
};
