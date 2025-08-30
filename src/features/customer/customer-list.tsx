import { useEffect, useRef, type SyntheticEvent } from "react";
import { useCustomers } from "../../store/customer/customers-store";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { Link } from "react-router";
import { CustomerListItem } from "./customer-list-item";
import { Button } from "../../ui/button";

export const CustomersList = () => {
  const {
    customers,
    fetchNextPage,
    error,
    resetFilters,
    hasActiveFilters,
    refetch,
    loading,
    filters,
  } = useCustomers();

  const handleScroll = (e: SyntheticEvent) => {
    const container = e.currentTarget;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollHeight - scrollTop - clientHeight <= 0) {
      fetchNextPage();
    }
  };

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
  });

  useEffect(() => {
    setTimeout(
      () =>
        parentRef.current?.scrollTo({
          top: 0,
          behavior: "smooth",
        }),
      100
    );
  }, [filters]);

  const renderVirtualItem = (virtualItem: VirtualItem) => {
    const customer = customers[virtualItem.index];

    return (
      <Link
        to={`./${customer.id}`}
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

  const noResultComponent = (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <span className="font-bold text-2xl text-center">
        {hasActiveFilters
          ? "No results found matching your filters"
          : "No results found"}
      </span>
      {hasActiveFilters && (
        <Button onClick={resetFilters}>Reset filters</Button>
      )}
    </div>
  );

  const errorComponent = (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <span className="font-bold text-2xl text-orange-500">{error}</span>
      <Button onClick={refetch} disabled={loading}>
        Retry
      </Button>
    </div>
  );

  return (
    <section
      className="w-full mt-4 flex-1 overflow-y-auto py-4"
      onScroll={handleScroll}
      ref={parentRef}
    >
      {error && errorComponent}
      {!customers.length && !error && noResultComponent}
      {!!customers.length && !error && (
        <ul
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
          className="flex flex-col w-full relative"
        >
          {rowVirtualizer.getVirtualItems().map(renderVirtualItem)}
        </ul>
      )}
    </section>
  );
};
