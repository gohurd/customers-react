import { useEffect, useState } from "react";
import { useCustomers } from "../../store/customer/customers-store";
import { Select } from "../../ui/select";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { CUSTOMER_FILTERS_INITIAL_VALUE } from "../../constants/customer/filters";
import type { CustomerFiltersState } from "../../types/customer/customer-types";

const GENDER_OPTIONS = [
  {
    label: "Fluid",
    value: "Fluid",
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const CustomersFilters = () => {
  const store = useCustomers();
  const [filters, setFilters] = useState<CustomerFiltersState>(
    CUSTOMER_FILTERS_INITIAL_VALUE
  );

  const filtersUpdated = Object.entries(store.filters).some(
    ([key, value]) => filters[key as keyof CustomerFiltersState] !== value
  );

  const handleButtonClick = () => {
    if (filtersUpdated) {
      store.setFilters(filters);
    } else {
      store.resetFilters();
    }
  };

  useEffect(() => {
    setFilters(store.filters);
  }, [store.filters]);

  return (
    <div className="mt-4 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-2 px-1">
        <Select
          options={GENDER_OPTIONS}
          value={filters.gender}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, gender: value }))
          }
          label="Gender"
        />
        <Input
          name="location"
          type="string"
          placeholder="Enter location"
          value={filters.location}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              location: value,
            }))
          }
        />
        <Input
          name="ageFrom"
          type="number"
          placeholder="Age from"
          value={filters.ageFrom}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              ageFrom: value,
            }))
          }
        />
        <Input
          name="ageTo"
          type="number"
          placeholder="Age to"
          value={filters.ageTo}
          onChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              ageTo: value,
            }))
          }
        />

        <Button
          onClick={handleButtonClick}
          disabled={!filtersUpdated && !store.hasActiveFilters}
        >
          {filtersUpdated ? "Apply" : "Reset"}
        </Button>
      </div>
    </div>
  );
};
