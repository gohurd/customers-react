import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterConfig } from "./router-config";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterConfig />
    </QueryClientProvider>
  );
};
