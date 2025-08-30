import { Page as PageWrapper } from "../../ui/page";
import {
  CustomersStoreProvider,
  useCustomers,
} from "../../store/customer/customers-store";
import { CustomersList } from "../../features/customer/customer-list";
import { CustomersFilters } from "../../features/customer/customer-filters";

const Page = () => {
  const { customers, total } = useCustomers();

  return (
    <PageWrapper
      title="Customers"
      titleRightAddon={
        <span>
          ({customers.length}
          {total !== null ? `/${total}` : ""})
        </span>
      }
    >
      <CustomersFilters />
      <CustomersList />
    </PageWrapper>
  );
};

export const CustomersIndexPage = () => {
  return (
    <CustomersStoreProvider>
      <Page />
    </CustomersStoreProvider>
  );
};
