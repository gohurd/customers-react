import { useNavigate, useParams } from "react-router";
import { useCustomerDetails } from "../../store/customer/customer-details-store";
import { Page } from "../../ui/page";
import { CustomerDetailsCard } from "../../features/customer/customer-details-card";
import back from "../../../public/arrow-back.svg";
import { IconButton } from "../../ui/icon-button";
import { lazy } from "react";

const CustomerDetailsOrders = lazy(
  () => import("../../features/customer/customer-details-orders")
);

export const CustomerDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
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
    <Page
      title="Customer details"
      leftAddon={
        <IconButton onClick={() => navigate(-1)}>
          <img src={back} className="w-6 h-6 object-cover" />
        </IconButton>
      }
      titleClassName="justify-start gap-4"
    >
      {customer && !error && (
        <div className="flex-1 flex flex-col min-h-0">
          <CustomerDetailsCard customer={customer} />
          {!!orders?.length && <CustomerDetailsOrders orders={orders} />}
        </div>
      )}
    </Page>
  );
};
