import type { RouteObject } from "react-router";
import { CustomersIndexPage } from "../../pages/customer/customer-index-page";
import { CustomerDetailsPage } from "../../pages/customer/customer-details-page";

export const customerRoutes: RouteObject = {
  path: "customers",
  children: [
    {
      index: true,
      element: <CustomersIndexPage />,
    },
    {
      path: ":id",
      element: <CustomerDetailsPage />,
    },
  ],
};
