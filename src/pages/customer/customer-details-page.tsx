import { useParams } from "react-router";
import { useCustomerDetails } from "../../store/customer/customer-details-store";
import { Page } from "../../ui/page";
import { CustomerDetailsCard } from "../../features/customer/customer-details-card";
import { CustomerDetailsOrders } from "../../features/customer/customer-details-orders";

export const CustomerDetailsPage = () => {
  const params = useParams();

  const id = Number(params.id);

  const { customer, error, orders } = useCustomerDetails({
    ...(params.id && { id }),
  });

  if (error || !id) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center h-full">
        <span className="font-bold text-2xl text-orange-500">
          {error || "Id is not valid"}
        </span>
      </div>
    );
  }

  return (
    <Page title="Customer details">
      {customer && !error && (
        <div className="flex-1 flex flex-col min-h-0">
          <CustomerDetailsCard customer={customer} />
          {!!orders?.length && <CustomerDetailsOrders orders={orders} />}
        </div>
      )}
    </Page>
  );
};
