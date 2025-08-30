import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { customerRoutes } from "./routes/customer/customer-routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/customers" />,
  },
  customerRoutes,
]);

export const RouterConfig = () => {
  return <RouterProvider router={router} />;
};
