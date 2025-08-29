import { Page as PageWrapper } from "../../ui/page";
import {
  CustomersStoreProvider,
  useCustomers,
} from "../../store/customer/customers-store";
import { CustomersList } from "../../features/customer/customer-list";

const Page = () => {
  const { customers } = useCustomers();

  return (
    <PageWrapper
      title="Customers"
      titleRightAddon={<span>({customers.length})</span>}
    >
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
