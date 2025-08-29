import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/customers" />,
  },
]);

export const RouterConfig = () => {
  return <RouterProvider router={router} />;
};
